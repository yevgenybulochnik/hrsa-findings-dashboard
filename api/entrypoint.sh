#!/bin/bash
flask db upgrade
exec flask run -h 0.0.0.0
