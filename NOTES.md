// change git ignore file

Edit .gitignore file.

ECHO mylogfile.log >> .gitignore
Remove all items from index.

git rm -r -f --cached .
Rebuild index.

git add .
Make new commit

git commit -m "Removed mylogfile.log"



// fix cors permissions according ro cors.json file

gsutil cors set cors-json-file.json gs://memeking
