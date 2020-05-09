"""Helper functions for item data munging"""
import re


def full_year(value):
    """Extract year and create full year ie: 2020"""
    match = re.search('(\d+)', value)
    if match:
        return f'20{match.group(1)}'
    else:
        return None


def entity_abv(value):
    """Return HRSA entity abreviation, if multiple ids return the first"""
    value = value.split(",")[0]
    match = re.search('(\D+)', value)
    if match:
        return match.group(1)
    else:
        return None


def closure_date(value):
    """Return audit closure date if one exists"""
    if value:
        match = re.search('.+:[ ]?(.+ \d+, \d+)', value)
        if match:
            return match.group(1)
        else:
            return None
