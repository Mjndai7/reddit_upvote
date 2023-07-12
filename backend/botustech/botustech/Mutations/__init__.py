import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError

from django.contrib.auth.hashers import make_password, check_password
from botustech.send_mail import SendEmail
from botustech.models import RegisteredUsers, RedditUrls
from botustech.models import RedditAccounts


from reddit.ui.add_account_widget import AddAccountWidget
from reddit.reddit_bot_manager import RedditBotManager



send_email = SendEmail()
bot_manager = RedditBotManager()
add_account = AddAccountWidget(bot_manager)

class UserType(DjangoObjectType):
    class Meta:
        model = RegisteredUsers

class UrlsType(DjangoObjectType):
    class Meta:
        model = RedditUrls

class AccountsType(DjangoObjectType):
    class Meta:
        model = RedditAccounts


class CreateUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)
    
    class Arguments:
        email = graphene.String(required=True)
        name = graphene.String(required=True)
        password = graphene.String(required=True)
        
    def mutate(self, info, email, name, password):
        if RegisteredUsers.objects.filter(email=email).exists():
            return GraphQLError("User Exists")
        try:
            user = RegisteredUsers.objects.create(
                email=email,
                name=name,
                password=make_password(password),
                isadmin=False,
                balance=0.00,
                totalvotes=0, 
                totalcomments=0,
                totalspend=0.00,
                package="None",
                status="ACTIVE",

            )
            #send_status = send_email.send_email(email, name, password)
            #print(send_status)

        except Exception as error:
            raise GraphQLError(str(error))
        
        return CreateUserMutation(user=user)


class LoginUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)
    
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        
    def mutate(self, info, email, password, ):

        try:
            user = RegisteredUsers.objects.get(email=email)
        
        except RegisteredUsers.DoesNotExist:
            raise "User Doesn't exist"
       
        if not check_password(password, user.password):
            return GraphQLError('Invalid credentials')
        
        return LoginUserMutation(user=user)

class GetUsersMutation(graphene.Mutation):
    users = graphene.List(UserType)

    class Arguments:
        email = graphene.String(required=True)
    
    def mutate(self, info, email):

        try:
            user = RegisteredUsers.objects.get(email=email)
            user_data = []
            if user.isadmin == "True":
                users_data = RegisteredUsers.objects.all()
                user_data.extend(users_data)

        except RegisteredUsers.DoesNotExist:
            raise GraphQLError("User doesn't exist")
        
        return GetUsersMutation(users=users_data)
       


class UrlsMutation(graphene.Mutation):
    url = graphene.Field(UrlsType)
    
    class Arguments:
        action = graphene.String(required=True)
        url = graphene.String(required=True)
        number = graphene.String(required=True)
        speed = graphene.String(required=True)
        email = graphene.String(required=True)
        
    def mutate(self, info, action, url, number, speed, email ):

        try:
            user = RegisteredUsers.objects.get(email=email)
            
            _url = RedditUrls.objects.create(
                url = url,
                action=action,
                number=number,
                speed=speed,
                status="WAITING",
                cost = round(int(number) * 0.05, 2),
                user=user
            )

        
        except RegisteredUsers.DoesNotExist:
            raise GraphQLError("User doesn't exist")    
       
        return UrlsMutation(url=_url)

class StartOrderMutation(graphene.Mutation):
    urls = graphene.List(UrlsType)
    
    class Arguments:
       urls = graphene.List(graphene.String, required=True)
       email = graphene.String(graphene.String, required=True)
        
        
    def mutate(self, info, urls, email):

        try:
            user = RegisteredUsers.objects.get(email=email)
            urls_data = []
            _urls = []
            for url in urls:
                reddit_urls = RedditUrls.objects.filter(url=url, user=user, status="WAITING")
                urls_data.extend(reddit_urls)

            _urls.extend(RedditUrls.objects.filter(user=user))

        except RegisteredUsers.DoesNotExist:
            raise GraphQLError("User doesn't exist")
       
        return StartOrderMutation(urls=_urls)


class RedditAccountsMutation(graphene.Mutation):
    accounts = graphene.List(AccountsType)
    
    class Arguments:
        name = graphene.String(required=True)
        proxies = graphene.String(required=True)
        email = graphene.String(required=True)
        
    def mutate(self, info, name, proxies, email ):

        try:
            user = RegisteredUsers.objects.get(email=email)
            if user.isadmin == "True" and name != "" and proxies != "":
                RedditAccounts.objects.create(
                    name=name,
                    proxies=proxies,
                    voted=0,
                    commented=0,
                    status="ACTIVE",
                )
            user_angent = "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.188 Safari/537.36 CrKey/1.54.250320"
            add_account.add_account(name, proxies, user_angent)
            
        except RegisteredUsers.DoesNotExist:
            raise GraphQLError("User doesn't exist")    
       
        return RedditAccountsMutation(accounts=RedditAccounts.objects.all())