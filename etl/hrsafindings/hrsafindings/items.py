# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.loader.processors import Join, MapCompose, TakeFirst
from w3lib.html import remove_tags, replace_escape_chars

def remove_empty(value):
    if value:
        return value.replace(u'\xa0', u'')



class HrsafindingsItem(scrapy.Item):
    year = scrapy.Field(
        output_processor= TakeFirst()
    )
    full_year = scrapy.Field()
    entity = scrapy.Field(
        input_processor = MapCompose(remove_tags, replace_escape_chars, remove_empty),
        output_processor = Join()
    )
    hrsa_id = scrapy.Field(
        input_processor = MapCompose(remove_tags, replace_escape_chars, remove_empty),
        output_processor = Join()
    )
    entity_abv = scrapy.Field()
    state = scrapy.Field(
        input_processor = MapCompose(remove_tags, replace_escape_chars, remove_empty),
        output_processor = Join()
    )
    opa_findings = scrapy.Field(
        input_processor = MapCompose(remove_tags, replace_escape_chars, remove_empty),
        output_processor = Join(separator='--')
    )
    sanction = scrapy.Field(
        input_processor = MapCompose(remove_tags, replace_escape_chars, remove_empty),
        output_processor = Join(separator='--')
    )
    cap_status = scrapy.Field(
        input_processor = MapCompose(remove_tags, replace_escape_chars, remove_empty),
        output_processor = Join(separator='--')
    )
    closure_date = scrapy.Field()
    entity_contact = scrapy.Field(
        input_processor = MapCompose(remove_tags, replace_escape_chars, remove_empty),
        output_processor = Join(separator='--')
    )
