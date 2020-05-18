"""Helper functions for item data munging"""
import re
import calendar


MONTHS = [ calendar.month_name[i] for i in range(1,13) ]
MONTHS_REGEX = f'({"|".join(MONTHS)})'


def full_year(value):
    """Extract year and create full year ie: 2020"""
    match = re.search('(\d+)', value)
    if match:
        return f'20{match.group(1)}'


def entity_abv(value):
    """Return HRSA entity abreviation, if multiple ids return the first"""
    value = value.split(",")[0]
    match = re.search('(\D+)', value)
    if match:
        return match.group(1)


def closure_date(value):
    """Return audit closure date if one exists"""
    if value:
        match = re.search(f'.+({MONTHS_REGEX} \d+, \d+)', value, re.IGNORECASE)
        if match:
            return match.group(1)
