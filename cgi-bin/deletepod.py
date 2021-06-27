#!/usr/bin/python3

import cgi
from subprocess import getoutput as g

print("content-type:text/plain")
print()

form_values = cgi.FieldStorage()

name = form_values.getvalue("name")
typ = form_values.getvalue("type")

status = g("sudo kubectl delete pod "+name+" --kubeconfig=admin.conf")
print(status)
