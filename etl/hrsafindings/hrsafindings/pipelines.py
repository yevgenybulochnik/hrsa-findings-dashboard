# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
from pathlib import Path
from .helpers import full_year, entity_abv, closure_date


class HrsafindingsPipeline:
    def process_item(self, item, spider):
        print(Path(__file__))
        item['full_year'] = full_year(item['year'])
        item['entity_abv'] = entity_abv(item['id'])
        item['closure_date'] = closure_date(item['cap_status'])
        print()
        return item
