from scrapy import Spider, Item, Field, Request
from helpers import parse_encode, parse_encode_nolist, score_category

class GuardianScraper(Spider):
    name, start_urls = "guardian", ["https://www.theguardian.com/lifeandstyle/ethical-fashion-directory-a-z-index"]
    def parse(self, response):
        count = 0
        for brand in response.selector.xpath('//*[@id="article"]/div[2]/div/div[1]/div[5]/p'):
            for item in brand.xpath('a'):
                count+=1
                name = item.xpath('text()').extract()
                href = item.xpath('@href').extract()
                yield Request(href[0], callback=self.parse_child)
        print count

    def parse_child(self,response):

        cat = response.selector.xpath('//*[@id="article"]/div[2]/div/div[1]/div[6]/div[2]/ul/li//a/text()').extract()
        name = response.xpath('//*[@id="article"]/header/div[1]/div/div/h1/text()').extract()
        description = response.xpath('//*[@id="article"]/div[2]/div/div[1]/div[5]/p[2]')
        _extended_des = None

        for p in description:
            if _extended_des is None:
                _extended_des = parse_encode(p.xpath('text()').extract())
            else:
                _extended_des = _extended_des + " " + parse_encode(p.xpath('text()').extract())

        print "...."

        cat_list = []
        for l in cat:
            l = parse_encode_nolist(l)
            print l
            if l in ['organic cotton', 'recycled', 'vegan materials', 'made in the uk', 'sustainable fabrics', 'fair trade']:
                cat_list.append(l)

        cat_score = 0
        base = 10
        score = base * cat_score
        print "-----"
        if len(cat_list) == 0:
            cat_list.append('unspecified')
        data = {"name": parse_encode_nolist(name[0].strip()), "description": _extended_des,
                "category": cat_list, "score_multiplier":cat_score,
                "score": score}
        yield data