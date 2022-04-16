# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Adm(models.Model):
    user_name = models.CharField(primary_key=True, max_length=20)
    passcode = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'adm'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class ClassLayout(models.Model):
    class_type = models.CharField(primary_key=True, max_length=2)
    class_name = models.CharField(max_length=30)
    capacity = models.IntegerField()
    cost_per_km = models.DecimalField(max_digits=3, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'class_layout'


class Credentials(models.Model):
    user_name = models.CharField(primary_key=True, max_length=20)
    passcode = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'credentials'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class FareLookup(models.Model):
    train_type = models.CharField(max_length=30, blank=True, null=True)
    additional_cost = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'fare_lookup'


class Passenger(models.Model):
    pnr = models.ForeignKey('Ticket', models.DO_NOTHING, db_column='pnr')
    pname = models.CharField(max_length=30)
    gender = models.CharField(max_length=10)
    age = models.IntegerField()
    stat = models.CharField(max_length=20, blank=True, null=True)
    meal_option = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'passenger'


class Receipt(models.Model):
    receipt_no = models.IntegerField(primary_key=True)
    transaction_time = models.DateTimeField(blank=True, null=True)
    payment_mode = models.CharField(max_length=20, blank=True, null=True)
    pnr = models.ForeignKey('Ticket', models.DO_NOTHING, db_column='pnr')
    user = models.ForeignKey('UserAccount', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'receipt'


class Reserve(models.Model):
    id = models.IntegerField()
    seat_no = models.IntegerField()
    class_type = models.CharField(max_length=20)
    pnr = models.OneToOneField('Ticket', models.DO_NOTHING, db_column='pnr', primary_key=True)

    class Meta:
        managed = False
        db_table = 'reserve'
        unique_together = (('pnr', 'class_type', 'seat_no', 'id'),)


class Sched(models.Model):
    train_no = models.OneToOneField('Train', models.DO_NOTHING, db_column='train_no', primary_key=True)
    trip_no = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'sched'
        unique_together = (('train_no', 'trip_no'),)


class SeatNo(models.Model):
    num = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'seat_no'


class Station(models.Model):
    st_code = models.CharField(primary_key=True, max_length=10)
    st_name = models.CharField(max_length=36)

    class Meta:
        managed = False
        db_table = 'station'


class Struct(models.Model):
    train_no = models.CharField(primary_key=True, max_length=6)
    class_type = models.CharField(max_length=2)
    size = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'struct'
        unique_together = (('train_no', 'class_type'),)


class Ticket(models.Model):
    pnr = models.CharField(primary_key=True, max_length=10)
    user = models.ForeignKey('UserAccount', models.DO_NOTHING, blank=True, null=True)
    train_no = models.ForeignKey('Train', models.DO_NOTHING, db_column='train_no')
    trip_no = models.IntegerField(blank=True, null=True)
    week_no = models.IntegerField(blank=True, null=True)
    boarding_from = models.ForeignKey(Station, models.DO_NOTHING, related_name='boarding_from')
    going_to = models.ForeignKey(Station, models.DO_NOTHING, related_name='going_to')
    fare = models.IntegerField(blank=True, null=True)
    booking_details = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ticket'


class TimeTable(models.Model):
    train_no = models.OneToOneField('Train', models.DO_NOTHING, db_column='train_no', primary_key=True)
    st_code = models.ForeignKey(Station, models.DO_NOTHING, db_column='st_code')
    arrival = models.TimeField()
    departure = models.TimeField()
    dist = models.IntegerField(blank=True, null=True)
    day_no = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'time_table'
        unique_together = (('train_no', 'st_code'),)


class Train(models.Model):
    id = models.CharField(primary_key=True, max_length=6)
    train_name = models.CharField(max_length=120)
    srcfk = models.ForeignKey(Station, models.DO_NOTHING, related_name='srcfk', to_field='st_code')
    destfk = models.ForeignKey(Station, models.DO_NOTHING, related_name='destfk', to_field='st_code')
    src = srcfk.get_attname()
    dest = destfk.get_attname()    
    train_type = models.CharField(max_length=30)
    pantry_avl = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'train'


class UserAccount(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.OneToOneField(Credentials, models.DO_NOTHING, db_column='user_name')
    first_name = models.CharField(max_length=20)
    middle_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    first_line = models.CharField(max_length=255)
    second_line = models.CharField(max_length=255, blank=True, null=True)
    pin = models.IntegerField()
    age = models.IntegerField(blank=True, null=True)
    phone_no = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_account'
