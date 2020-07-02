# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import datetime
from pathlib import Path
from scrapy.exporters import JsonItemExporter
from .helpers import full_year, entity_abv, closure_date, tag_findings


class HrsafindingsPipeline:
    def __init__(self):
        self.path = self.create_data_path()
        self.file = open(self.path, 'wb')
        self.exporter = JsonItemExporter(self.file)
        self.exporter.start_exporting()

    def create_data_path(self):
        filepath = Path(__file__).parents[2] / 'data'
        filepath.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.datetime.now().strftime('%m-%d-%y')
        return filepath / f'{timestamp}-data.json'

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()

    def process_item(self, item, spider):
        item['full_year'] = full_year(item['year'])
        item['entity_abv'] = entity_abv(item['hrsa_id'])
        item['closure_date'] = closure_date(item['cap_status'])
        item['tags'] = tag_findings(item['opa_findings'])
        self.exporter.export_item(item)
        return item
