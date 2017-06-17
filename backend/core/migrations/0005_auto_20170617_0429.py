# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-06-17 04:29
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20170608_1454'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='user',
        ),
        migrations.RemoveField(
            model_name='chatroom',
            name='user1',
        ),
        migrations.RemoveField(
            model_name='chatroom',
            name='user2',
        ),
        migrations.RemoveField(
            model_name='friend',
            name='user',
        ),
        migrations.RemoveField(
            model_name='multichatuser',
            name='user',
        ),
        migrations.AddField(
            model_name='chat',
            name='baseuser',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='core.BaseUser'),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='baseuser1',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='baseuser1', to='core.BaseUser'),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='baseuser2',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='baseuser2', to='core.BaseUser'),
        ),
        migrations.AddField(
            model_name='friend',
            name='baseuser',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='baseuser', to='core.BaseUser'),
        ),
        migrations.AddField(
            model_name='multichatuser',
            name='baseuser',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='core.BaseUser'),
        ),
        migrations.AlterField(
            model_name='chat',
            name='invisible',
            field=models.ManyToManyField(default=None, related_name='invisible', to='core.BaseUser'),
        ),
        migrations.AlterField(
            model_name='feed',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.BaseUser'),
        ),
        migrations.AlterField(
            model_name='feed',
            name='dislike',
            field=models.ManyToManyField(default=None, related_name='disliked', to='core.BaseUser'),
        ),
        migrations.AlterField(
            model_name='feed',
            name='like',
            field=models.ManyToManyField(default=None, related_name='liked', to='core.BaseUser'),
        ),
        migrations.AlterField(
            model_name='friend',
            name='friend',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friend', to='core.BaseUser'),
        ),
        migrations.AlterField(
            model_name='reply',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.BaseUser'),
        ),
    ]
