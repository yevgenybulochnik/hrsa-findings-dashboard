import scrapy
from pathlib import Path
from scrapy.loader import ItemLoader
from hrsafindings.items import HrsafindingsItem

class FindingsSpider(scrapy.Spider):
    name = 'findings'
    start_urls = [
        'https://www.hrsa.gov/opa/program-integrity/index.html'
    ]

    def parse(self, response):
        results_links = response.xpath('//h2[text()="Audits of Covered Entity Results"]/following-sibling::div//a')
        yield from response.follow_all(results_links, self.parse_results)

    def parse_results(self, response):
        table_rows = response.xpath('//tbody/tr')

        for row in table_rows:
            il = ItemLoader(item=HrsafindingsItem(), selector=row)
            il.add_value('year', Path(response.request.url).stem)
            il.add_xpath('entity', './/th/text()')
            il.add_xpath('entity', './/th/child::*')
            il.add_xpath('id', './/td[1]/text()')
            il.add_xpath('id', './/td[1]/child::*')
            il.add_xpath('state', './/td[2]/text()')
            il.add_xpath('state', './/td[2]/child::*')
            il.add_xpath('opa_findings', './/td[3]/text()')
            il.add_xpath('opa_findings', './/td[3]/child::*')
            il.add_xpath('sanction', './/td[4]')
            il.add_xpath('cap_status', './/td[5]/text()')
            il.add_xpath('cap_status', './/td[5]/child::*')
            il.add_xpath('entity_contact', './/td[6]')
            yield il.load_item()
