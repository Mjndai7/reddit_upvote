import graphene
from graphene_django import DjangoObjectType

from .Mutations import CreateUserMutation, UserType, LoginUserMutation
from .Mutations import UrlsMutation, StartOrderMutation
from .Mutations import GetUsersMutation, RedditAccountsMutation
from .Mutations import ResetPasswordMutation
from .Mutations import UpdatePasswordMutation
from .Mutations import AddUserMutation
from .Mutations import ActivateUserMutation


class Query(graphene.ObjectType):
    contactUsers = graphene.Field(UserType)

    def resolve_create_user(self, email, name, password):
        mutation = CreateUserMutation()
        result = mutation.mutate(email, name, password)
        return result.user
    
    def resolve_login(self, info, email, password):
        mutation = LoginUserMutation()
        result = mutation.mutate(info, email, password )
        return result.user
    
    def resolve_urls(self, info, email, action, url, number, speed):
        mutation = UrlsMutation()
        result = mutation.mutate(info, email, action, url, number, speed )
        return result.url
    
    def resolve_order(self, info, urls, email):
        mutation = StartOrderMutation()
        result = mutation.mutate(info, urls,  email)
        return result.urls

    def resolve_users(self, info, email):
        mutation = GetUsersMutation()
        result = mutation.mutate(info, email)
        return result.users
    
    def resolve_accounts(self, info, email, proxies, name):
        mutation = RedditAccountsMutation()
        result = mutation.mutate(info, email, proxies, name)
        return result.accounts
    
    def resolve_update_password(self, info, email, token, new_password):
        mutation = UpdatePasswordMutation()
        result = mutation.mutate(info, email, token, new_password)
        return result.success
    
    def resolve_reset_password(self, info, email):
        mutation = ResetPasswordMutation()
        result = mutation.mutate(info, email)
        return result.success
    
    def resolve_add_user(self, info, email,admin_email):
        mutation = AddUserMutation()
        result = mutation.mutate(info, email, admin_email)
        return result.success
    
    def resolve_activate_user(self, info, uid,token):
        mutation = ActivateUserMutation()
        result = mutation.mutate(info, uid, token)
        return result.message

class Mutation(graphene.ObjectType):
    create_users  = CreateUserMutation.Field()
    login_user    = LoginUserMutation.Field()
    create_order  = UrlsMutation.Field()
    start_order    = StartOrderMutation.Field()
    get_users    = GetUsersMutation.Field()
    get_accounts  = RedditAccountsMutation.Field()
    update_password = UpdatePasswordMutation.Field()
    reset_password = ResetPasswordMutation.Field()
    add_user = AddUserMutation.Field()
    activate_user = ActivateUserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)