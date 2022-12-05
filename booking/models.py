from django.db import models
from smart_selects.db_fields import ChainedForeignKey


class BookingPole(models.Model):
    name = models.CharField('Name', max_length=50)
    time_6_7 = models.BooleanField('6 : 7', default=True)
    time_7_8 = models.BooleanField('7 : 8', default=True)
    time_8_9 = models.BooleanField('8 : 9', default=True)
    time_9_10 = models.BooleanField('9 : 10', default=True)
    time_10_11 = models.BooleanField('10 : 11', default=True)
    time_11_12 = models.BooleanField('11 : 12', default=True)
    time_12_13 = models.BooleanField('12 : 13', default=True)
    time_13_14 = models.BooleanField('13 : 14', default=True)
    time_14_15 = models.BooleanField('14 : 15', default=True)
    time_15_16 = models.BooleanField('15 : 16', default=True)
    time_16_17 = models.BooleanField('16 : 17', default=True)
    time_17_18 = models.BooleanField('17 : 18', default=True)
    time_18_19 = models.BooleanField('18 : 19', default=True)
    time_19_20 = models.BooleanField('19 : 20', default=True)
    time_20_21 = models.BooleanField('20 : 21', default=True)
    time_21_22 = models.BooleanField('21 : 22', default=True)
    time_22_23 = models.BooleanField('22 : 23', default=True)
    time_23_24 = models.BooleanField('23 : 24', default=True)

    class Meta:
        verbose_name = 'BookingPole'
        verbose_name_plural = 'BookingPoles'
        ordering = ['id']

    def __str__(self):
        return self.name


class BookingTime(models.Model):
    time_from = models.IntegerField("Check In")
    time_to = models.IntegerField("Check Out")

    class Meta:
        verbose_name = 'BookingTime'
        verbose_name_plural = 'BookingTimes'
        ordering = ['id']

    def __str__(self):
        return f'{self.time_from} : {self.time_to}'


class BookingItem(models.Model):
    name = models.CharField('Student\'s Name', max_length=30)
    booking_day = models.DateField('Booking Day')
    booking_item = models.ForeignKey(BookingPole, on_delete=models.CASCADE, related_name='items')
    booking_time = models.ManyToManyField(BookingTime, related_name='times')

    class Meta:
        verbose_name = 'BookingItem'
        verbose_name_plural = 'BookingItems'
        ordering = ['id']

    def __str__(self):
        return self.name
