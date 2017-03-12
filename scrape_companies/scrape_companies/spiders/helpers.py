import unicodedata, json
import requests

def parse_encode(listitem):
    print "parse"
    print len(listitem)
    if len(listitem) > 0:
        return str(unicodedata.normalize('NFKD', listitem[0]).encode('ascii', 'ignore').lower())
    else:
        return None

def parse_encode_nolist(name):
    item = str(unicodedata.normalize('NFKD', name).encode('ascii','ignore').lower())
    item = item.rstrip()
    item = item.lstrip()
    return item

def score_category(category):
    cat_dict = {
        "unspecified": 0,
        "made in the uk": 1,
        "vegan materials": 2,
        "organic cotton": 3,
        "fair trade": 4,
        "sustainable fabrics": 5,
        "recycled": 6
    }
    value = cat_dict[category]
    return value

def load_data(file):
    target = json.loads(open(file).read())
    for item in target:
        dd={
        "category": item['category'],
        "name": item['name'],
        "brand_measurement_number": item['score'],
        "score_multiplier": item['score_multiplier'],
        "description": item['description']
        }
        r = requests.post("http://127.0.0.1:6543/api/brands", json=dd)
        print r.status_code