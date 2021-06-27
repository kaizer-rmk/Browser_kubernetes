#!/usr/bin/python3

import cgi
from subprocess import getoutput as g

print("content-type:text/plain")
print()

form_values = cgi.FieldStorage()

dep_name = form_values.getvalue("dep")
port = form_values.getvalue("port")
typ = form_values.getvalue("typ")

status = g("sudo kubectl expose deployment "+dep_name+" --port="+port+" --type="+typ+" --kubeconfig=admin.conf")
print(status)
