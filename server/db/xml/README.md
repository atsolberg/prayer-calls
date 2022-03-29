## Bible Versions as XML files

Pulled from https://github.com/dborza/bible-tools  
These are entire bible versions as XML data  
Considering using in a mongodb as a backup if api throttling becomes an issue  
See https://github.com/bibleapi/bibleapi-rest for example on how to convert to json and serve data

## Issues
Need to add a couple verses:
```bash
grep -n '></verse' *
msg.xml:7014:<verse name="10"></verse>
msg.xml:11985:<verse name="12"></verse>
nkjv.xml:25176:<verse name="20"></verse>
nlt.xml:23790:<verse name="1"></verse>
nlt.xml:23867:<verse name="1"></verse>
```