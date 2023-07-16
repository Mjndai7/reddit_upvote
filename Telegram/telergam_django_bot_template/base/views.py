from telegram_django_bot.td_viewset import TelegramViewSet
from telegram_django_bot.user_viewset import UserViewSet as TGUserViewSet, UserForm
from telegram_django_bot.models import BotMenuElem
from telegram_django_bot.utils import handler_decor
from telegram_django_bot.telegram_lib_redefinition import InlineKeyboardButtonDJ, InlineKeyboardMarkup, InlineKeyboardButton
from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update

from django.conf import settings
from django.utils.translation import (gettext as _, gettext_lazy)
from telegram_django_bot.routing import telegram_reverse
from telegram_django_bot.tg_dj_bot import TG_DJ_Bot
from telegram import Update,  ParseMode
from telegram.ext import ConversationHandler
from telegram.ext import CommandHandler, MessageHandler, filters, ContextTypes
from telegram.ext import Updater
from .forms import BotMenuElemForm
from .models import User

from .database import DataBaseOperations
from .payments import Payments

help_link = "https://web.telegram.org/k/#@dannyofm"
ACTION, PHOTO, LOCATION, BIO = range(4)


@handler_decor()
def start(bot: TG_DJ_Bot, update: Update, user: User):
    message = _(
        f'Hello %(name)s!?, Welcome to Max Upvote reddit 🤖 \n'
        'Get reddit votes and comments for as low as $0.2 😄 \n'
        '\n'
        '           100⬆️  =   $20.0\n'
        '           500⬆️  =   $50.0\n'
        '        1 000⬆  =   $100\n'
        '        5 000⬆️  =   $500\n'
        '   100 000⬆️  =   $20 0000\n'
        '\n'

        '🏁 Start - 2 minutes\n'
        '🌪 UPvoting speed: up to 240 ⬆️ per hour\n'
        '💯 Instant Delivery (Guaranteed)\n\n'

        "⬆️ We will top up your account with 50 Actions so that you can test our services.\n\n"
        "🔥 That's enough to get you into the HOT of any subreddit\n\n"
        "👌 Feel free to test comments, upvotes or downvotes\n\n"
        '\n'
    
    ) % {
        'name': user.telegram_username
    }
    
 
    buttons = [
        [InlineKeyboardButtonDJ(text=_('⚙️ Settings'), callback_data='us/se')],
        [InlineKeyboardButtonDJ(
            text=_('🏁 Get Started.'),
            callback_data=GetStartedViewSet(telegram_reverse('base:GetStartedViewSet'),
                 user=user, bot=bot, update=update).gm_callback_data('show_list', '')
            # '' - for foreign_filter
        )],
        [InlineKeyboardButtonDJ(
            text=_('💵 Top Up'),
            callback_data=AddBalanceViewSet(telegram_reverse('base:AddBalanceViewSet'),
             user=user, bot=bot, update=update).gm_callback_data('show_list', '')
            # '' - for foreign_filter
        )],
        [InlineKeyboardButtonDJ(
            text=_('🔑 Account'),
            callback_data=("/account")
            # '' - for foreign_filter
        )],
        [InlineKeyboardButtonDJ(
            text=_('🆕 New Order'),
            callback_data=BotMenuElemViewSet(telegram_reverse('base:BotMenuElemViewSet')).gm_callback_data('show_list','')
            # '' - for foreign_filter
        )],
        [InlineKeyboardButtonDJ(
            text=_('🚀 Bulk Order'),
            callback_data=BotMenuElemViewSet(telegram_reverse('base:BotMenuElemViewSet')).gm_callback_data('show_list','')
            # '' - for foreign_filter
        )],
        [InlineKeyboardButtonDJ(
            text=_('💬 Support'),
            callback_data=BotMenuElemViewSet(telegram_reverse('base:BotMenuElemViewSet')).gm_callback_data('show_list','')
            # '' - for foreign_filter
        )],
    ]
    # here 2 examples of construct callback_data: just make utrl your self in string or
    # generate it with telegram_reverse (construct utrl part to BotMenuElemViewSet) and
    # gm_callback_data (add method and args to Viewset)
    return bot.edit_or_send(update, message, buttons)

@handler_decor()
def account(bot: TG_DJ_Bot, update: Update, user: User):
    chat_id = update.effective_chat.id
    database = DataBaseOperations()
    is_member, user_data = database.is_a_member(user.telegram_username)
    if is_member:
        #get member details from the database and display for the user
        message = _(
        f'*Username:*     {user_data["username"]}.\n'
        f'*Email\t:*            {user_data["user_email"]}.\n'
        f'*Balance\t:*        {user_data["balance"]}.\n'
        f'*Package \t:*       {user_data["package"]}.\n'
        f'*Joined\t:*          {user_data["date_created"]}.\n'
        )

        support_text = ('💬 Support')
        support_button = InlineKeyboardButton(support_text, url=help_link)
      

        _buttons = [
            [InlineKeyboardButtonDJ(
                text=_('💵 Top Up'),
                callback_data=AddBalanceViewSet(telegram_reverse('base:AddBalanceViewSet'),
                user=user, bot=bot, update=update).gm_callback_data('show_list', '')
                # '' - for foreign_filter
            )],
            [InlineKeyboardButtonDJ(
                text=_('🆕 New Order'),
                callback_data=BotMenuElemViewSet(telegram_reverse('base:BotMenuElemViewSet')).gm_callback_data('show_list','')
                # '' - for foreign_filter
            )],
            [InlineKeyboardButtonDJ(
                text=_('🚀 Bulk Order'),
                callback_data=BotMenuElemViewSet(telegram_reverse('base:BotMenuElemViewSet')).gm_callback_data('show_list','')
                # '' - for foreign_filter
            )],
            [support_button],
            [InlineKeyboardButtonDJ(
                text=_('🔙 Menu'),
                callback_data=settings.TELEGRAM_BOT_MAIN_MENU_CALLBACK
            )],
            
        ]
        reply_markup = InlineKeyboardMarkup(_buttons)
        # here 2 examples of construct callback_data: just make utrl your self in string or
        # generate it with telegram_reverse (construct utrl part to BotMenuElemViewSet) and
        # gm_callback_data (add method and args to Viewset)
        return bot.send_message(chat_id=chat_id, text=f'{message}', reply_markup=reply_markup, parse_mode='Markdown')

async def start_with_action(update: Update, context: ContextTypes) -> int:
    """Starts the conversation and asks the user about their gender."""
    reply_keyboard = [["Upvotes", "Downvotes", "Comments"]]

    await update.message.reply_text(
        "You need to choose one action to continue\n\n"
        "What action would you like to perform?\n\n",
        reply_markup=ReplyKeyboardMarkup(
            reply_keyboard, one_time_keyboard=True, input_field_placeholder="What action?"
        ),
    )
    return ACTION

async def action(update: Update, context: ContextTypes) -> int:
    """Stores the selected gender and asks for a photo."""
    user = update.message.from_user
    await update.message.reply_text(
        "I see! Please send me a photo of yourself, "
        "so I know what you look like, or send /skip if you don't want to.",
        reply_markup=ReplyKeyboardRemove(),
    )

    return PHOTO

async def cancel(update: Update, context: ContextTypes) -> int:
    """Cancels and ends the conversation."""
    user = update.message.from_user
    await update.message.reply_text(
        "Bye! I hope we can talk again some day.", reply_markup=ReplyKeyboardRemove()
    )

    return ConversationHandler.END

@handler_decor()
def new_order(bot: TG_DJ_Bot, update: Update, user: User):
    database = DataBaseOperations()

    is_member, user_data = database.is_a_member(user.telegram_username)
    if is_member and user_data:
        # Create a conversation handler
        conv_handler = ConversationHandler(
            entry_points=[CommandHandler("start_with_action", start_with_action)],
            states={
                ACTION: [MessageHandler(filters.Filters.text, action)],
            },
            fallbacks=[CommandHandler("cancel", cancel)],
        )

        conv_handler.handle_update
        
class GetStartedViewSet(TelegramViewSet):
    viewset_name = 'BotMenuElem'
    model_form = BotMenuElemForm
    queryset = BotMenuElem.objects.all()
    foreign_filter_amount = 1

    def __init__(self, prefix, user=None, bot=None, update=None, foreign_filters=None):
        super().__init__(prefix, user, bot, update, foreign_filters)
        self.user = user
        self.bot = bot
        self.update = update
        

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.foreign_filters and len(self.foreign_filters) > 0:
            queryset = queryset.filter(command__contains=self.foreign_filters[0])
        return queryset

    
    def create(self, field=None, value=None, initial_data=None):
        initial_data = {
            'is_visable': True,
            'callbacks_db': '[]',
            'buttons_db': '[]',
        }
        return super().create(field, value, initial_data)


    #def get_crypto_link(self, email, username):
    
    def show_list(self, page=0, per_page=10, columns=1, *args, **kwargs):
        __, (mess, buttons) = super().show_list( page, per_page, columns, *args, **kwargs)
        chat_id = self.update.effective_chat.id
        image_urls = [
                './images/account.png',
                './images/balance.png',
                './images/order.png',
                './images/space.png',
            ]
        image_descriptions = [
                '*👤 Create Account*\n\nCreate an account to track your orders. Only an email address is needed.',
                '*💵 Top Balance*\n\nAdd balance: you can pay with a card, PayPal, crypto, or any other mode.',
                '*🚀 Place Order*\n\nCreate an order: either one link or bulk order with multiple Reddit post URLs.',
                '*👋 We Take Action*\n\nWait back and watch us do our magic as your post goes to space.'
            ]
        # Send each image with its description
        for i in range(len(image_urls)):
            image_path = image_urls[i]
            description = image_descriptions[i]
            with open(image_path, 'rb') as photo_file:
                self.bot.send_photo(chat_id=chat_id, photo=photo_file, caption=description, parse_mode=ParseMode.MARKDOWN)

        message = "💨 *It is that fast and easy. 24/7 Support*"
        _buttons = [
            [InlineKeyboardButtonDJ(
            text=_('💬 Support'),
            callback_data=BotMenuElemViewSet(telegram_reverse('base:BotMenuElemViewSet')).gm_callback_data('show_list','')
            # '' - for foreign_filter
            )],
            [InlineKeyboardButtonDJ(
                text=_('🔙 Menu'),
                callback_data=settings.TELEGRAM_BOT_MAIN_MENU_CALLBACK
            )],
        ]

        reply_markup = InlineKeyboardMarkup(_buttons)
        self.bot.send_message(chat_id=chat_id, text=message, reply_markup=reply_markup, parse_mode=ParseMode.MARKDOWN)

        return self.CHAT_ACTION_MESSAGE, (mess, buttons)

class AddBalanceViewSet(TelegramViewSet):
    viewset_name = 'BotMenuElem'
    model_form = BotMenuElemForm
    queryset = BotMenuElem.objects.all()
    foreign_filter_amount = 1

    def __init__(self, prefix, user=None, bot=None, update=None, foreign_filters=None):
        super().__init__(prefix, user, bot, update, foreign_filters)
        self.user = user
        self.bot= bot
        self.update = update


    def get_queryset(self):
        queryset = super().get_queryset()
        if self.foreign_filters and len(self.foreign_filters) > 0:
            queryset = queryset.filter(command__contains=self.foreign_filters[0])
        return queryset

    
    def create(self, field=None, value=None, initial_data=None):
        initial_data = {
            'is_visable': True,
            'callbacks_db': '[]',
            'buttons_db': '[]',
        }
        return super().create(field, value, initial_data)


    #def get_crypto_link(self, email, username):
    
    def show_list(self, page=0, per_page=10, columns=1, *args, **kwargs):
        __, (mess, buttons) = super().show_list( page, per_page, columns, *args, **kwargs)
        
        message = ('🚀 *Here are the packages* \n'
        '\n'
        '           100⬆️  =   $20.0\n'
        '           500⬆️  =   $50.0\n'
        '        1 000⬆  =   $100\n'
        '        5 000⬆️  =   $500\n'
        '   100 000⬆️  =   $20 0000\n'
        '\n')

        _buttons = [
            [InlineKeyboardButtonDJ(
                text=_('USDT(TRC20)'),
                callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                user=self.user, bot=self.bot, update=self.update).gm_callback_data('show_list', '')
            )],
            [InlineKeyboardButtonDJ(
                text=_('USDT(ERC20)'),
                callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                user=self.user, bot=self.bot, update=self.update).gm_callback_data('show_list', '')
            )],
            [InlineKeyboardButtonDJ(
                text=_('BTC'),
                callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                user=self.user, bot=self.bot, update=self.update,).gm_callback_data('show_list','')
            )],
            [InlineKeyboardButtonDJ(
                text=_('ETH'),
                callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                user=self.user, bot=self.bot, update=self.update,).gm_callback_data('show_list','')
            )],
            [InlineKeyboardButtonDJ(
                text=_('LTC'),
                callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                user=self.user, bot=self.bot, update=self.update,).gm_callback_data('show_list','')
            )],
            [InlineKeyboardButtonDJ(
                text=_('CARD'),
                callback_data=StripePaymentsViewSet(telegram_reverse('base:StripePaymentsViewSet'), 
                user=self.user, bot=self.bot, update=self.update,).gm_callback_data('show_list','')
            )],
            [InlineKeyboardButtonDJ(
                text=_('PAYPAL'),
                callback_data=settings.TELEGRAM_BOT_MAIN_MENU_CALLBACK
            )],
            [InlineKeyboardButtonDJ(
                text=_('WISE'),
                callback_data=settings.TELEGRAM_BOT_MAIN_MENU_CALLBACK
            )],
            [InlineKeyboardButtonDJ(
            text=_('💬 other methods? || Support'),
            callback_data=BotMenuElemViewSet(telegram_reverse('base:BotMenuElemViewSet')).gm_callback_data('show_list','')
            # '' - for foreign_filter
            )],
            [InlineKeyboardButtonDJ(
                text=_('🔙 Menu'),
                callback_data=settings.TELEGRAM_BOT_MAIN_MENU_CALLBACK
            )],
            
        ]
        return self.CHAT_ACTION_MESSAGE, (message, _buttons)

class PaymentsViewSet(TelegramViewSet):
    viewset_name = 'PaymentsViewSet'
    model_form = BotMenuElemForm
    queryset = BotMenuElem.objects.all()
    foreign_filter_amount = 1

    def __init__(self, prefix, user=None, bot=None, update=None, foreign_filters=None):
        super().__init__(prefix, user, bot, update,  foreign_filters)
        self.user = user
        self.database = DataBaseOperations()
        self.payments = Payments()
        self.bot = bot
        self.update = update

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.foreign_filters[0]:
            queryset = queryset.filter(command__contains=self.foreign_filters[0])
        
        return queryset

    def create(self, field=None, value=None, initial_data=None):
        initial_data = {
            'is_visable': True,
            'callbacks_db': '[]',
            'buttons_db': '[]',
        }
        return super().create(field, value, initial_data)

    def show_list(self, page=0, per_page=10, columns=1, *args, **kwargs):
        __, (mess, buttons) = super().show_list(page, per_page, columns)
        chat_id = self.update.effective_chat.id

        is_member, user_data = self.database.is_a_member(self.user)
        mess = "24/7 support form our team."
        if is_member:
            #request payment link if user is a member.
            payment_link = self.payments.create_crypto_link(self.user)
            message =( f'click pay with crpyto  to make payments🤖\n\n'
                'Be sure to use your email.\n'
                f'{user_data["user_email"]}\n')
                    
            button_text = f"pay with crypto"
            support_text = ('💬 More? || Support')
            support_button = InlineKeyboardButton(support_text, url=help_link)
            payment_button = InlineKeyboardButton(button_text, url=payment_link)
            _buttons = [
            [payment_button],
            [support_button],
            [InlineKeyboardButtonDJ(
                text=_('🔙 Menu'),
                callback_data=settings.TELEGRAM_BOT_MAIN_MENU_CALLBACK
            )],
            ]

            reply_markup = InlineKeyboardMarkup(_buttons)
            self.bot.send_message(chat_id=chat_id, text=f'{message}', reply_markup=reply_markup, parse_mode='Markdown')
         
        return self.CHAT_ACTION_MESSAGE, (mess, buttons)

class StripePaymentsViewSet(TelegramViewSet):
    viewset_name = 'StripePaymentsViewSet'
    model_form = BotMenuElemForm
    queryset = BotMenuElem.objects.all()
    foreign_filter_amount = 1

    def __init__(self, prefix, user=None, bot=None, update=None, foreign_filters=None):
        super().__init__(prefix, user, bot, update,  foreign_filters)
        self.user = user
        self.database = DataBaseOperations()
        self.payments = Payments()
        self.bot = bot
        self.update = update

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.foreign_filters and len(self.foreign_filters) > 0:
            if self.foreign_filters[0]:
                queryset = queryset.filter(command__contains=self.foreign_filters[0])
        return queryset

    def create(self, field=None, value=None, initial_data=None):
        initial_data = {
            'is_visable': True,
            'callbacks_db': '[]',
            'buttons_db': '[]',
        }
        return super().create(field, value, initial_data)
    

    def show_list(self, page=0, per_page=10, columns=1, *args, **kwargs):
        __, (mess, buttons) = super().show_list(page, per_page, columns, args, kwargs)
        chat_id = self.update.effective_chat.id

        message = "Select from these  packages."
        is_member, user_data = self.database.is_a_member(self.user)
        if is_member and user_data:
             _buttons = [
                [InlineKeyboardButtonDJ(
                    text=_('Basic $20.00'),
                    callback_data=GetStripPackageViewSet(telegram_reverse('base:GetStripPackageViewSet'), 
                    user=self.user.telegram_username, bot=self.bot, update=self.update).gm_callback_data('show_list', 'Basic $20.00')
                )],
                [InlineKeyboardButtonDJ(
                    text=_('Standard $50.00'),
                    callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                    user=self.user, bot=self.bot, update=self.update).gm_callback_data('show_list', '')
                )],
                [InlineKeyboardButtonDJ(
                    text=_('Premium $100.00'),
                    callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                    user=self.user, bot=self.bot, update=self.update,).gm_callback_data('show_list','')
                )],
                [InlineKeyboardButtonDJ(
                    text=_('Gold $500.00'),
                    callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                    user=self.user, bot=self.bot, update=self.update,).gm_callback_data('show_list','')
                )],
                [InlineKeyboardButtonDJ(
                    text=_('Enterprice.'),
                    callback_data=PaymentsViewSet(telegram_reverse('base:PaymentsViewSet'), 
                    user=self.user, bot=self.bot, update=self.update,).gm_callback_data('show_list','')
                )],
                
                [InlineKeyboardButtonDJ(
                text=_('💬 More? || Support'),
                callback_data=BotMenuElemViewSet(telegram_reverse('base:BotMenuElemViewSet'),
                ).gm_callback_data('show_list','')
                # '' - for foreign_filter
                )],
                [InlineKeyboardButtonDJ(
                    text=_('🔙 Menu'),
                    callback_data=settings.TELEGRAM_BOT_MAIN_MENU_CALLBACK
                )],
                
            ]
        return self.CHAT_ACTION_MESSAGE, (message, _buttons)

class GetStripPackageViewSet(TelegramViewSet):
    viewset_name = 'BotMenuElem'
    model_form = BotMenuElemForm
    queryset = BotMenuElem.objects.all()
    foreign_filter_amount = 1

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.foreign_filters and len(self.foreign_filters) > 0:
            if self.foreign_filters[0]:
                queryset = queryset.filter(command__contains=self.foreign_filters[0])
        return queryset

    def create(self, field=None, value=None, initial_data=None):
        initial_data = {
            'is_visable': True,
            'callbacks_db': '[]',
            'buttons_db': '[]',
        }
        return super().create(field, value, initial_data)

    def show_list(self, page=0, per_page=10, columns=1, *args, **kwargs):
        __, (mess, buttons) = super().show_list(page, per_page, columns, args, kwargs)
        button_text = kwargs.get('button_text', None)
        print(args)
        print("BUtom" , button_text)

        return self.CHAT_ACTION_MESSAGE, (mess, buttons)




























































class BotMenuElemViewSet(TelegramViewSet):
    viewset_name = 'BotMenuElem'
    model_form = BotMenuElemForm
    queryset = BotMenuElem.objects.all()
    foreign_filter_amount = 1

    prechoice_fields_values = {
        'is_visable': (
            (True, '👁 Visable'),
            (False, '🚫 Disabled'),
        )
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.foreign_filters[0]:
            queryset = queryset.filter(command__contains=self.foreign_filters[0])
        return queryset

    def create(self, field=None, value=None, initial_data=None):
        initial_data = {
            'is_visable': True,
            'callbacks_db': '[]',
            'buttons_db': '[]',
        }
        return super().create(field, value, initial_data)

    def show_list(self, page=0, per_page=10, columns=1, *args, **kwargs):
        __, (mess, buttons) = super().show_list(page, per_page, columns)
        
        return self.CHAT_ACTION_MESSAGE, (mess, buttons)

class UserViewSet(TGUserViewSet):
    model_form = UserForm
    use_name_and_id_in_elem_showing = False

    def show_elem(self, model_id=None, mess=''):
        mess = _('⚙️ Settings\n\n')
        __, (mess, buttons) = super().show_elem(self.user.id, mess)

        buttons += [
            [InlineKeyboardButtonDJ(
                text=_('🔙 Menu'),
                callback_data=settings.TELEGRAM_BOT_MAIN_MENU_CALLBACK
            )],
        ]
       
        return self.CHAT_ACTION_MESSAGE, (mess, buttons)

@handler_decor()
def some_debug_func(bot: TG_DJ_Bot, update: Update, user: User):
    # the message is written in Django notation for translation (with compiling language you can easy translate text)
    message = _(
        'This func is able only in DEBUG mode. press /some_debug_func'
        'to see this elem. By using handler_decor you have user instance %(user)s and some other features'
    ) % {
        'user': user
    }
   
    return bot.edit_or_send(update, message, buttons)

