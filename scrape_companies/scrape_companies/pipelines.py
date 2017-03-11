# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import json

#free of back end pipeline
class JsonWriterPipeline(object):
    def __init__(self):
        self.file = open('brands.jl', 'wb')

    def process_item(self, item, spider):

        line = json.dumps(dict(item), indent=4)
        print >> self.file, line + ","


