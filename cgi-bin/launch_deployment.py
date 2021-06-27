#!/usr/bin/python3

import cgi
from subprocess import getoutput as g

print("content-type:text/plain")
print()

form_values = cgi.FieldStorage()

dep_name = form_values.getvalue("dep")
image_name = form_values.getvalue("img")

status = g("sudo kubectl create deployment "+dep_name+" --image="+image_name+" --kubeconfig=admin.conf")
print(status)
