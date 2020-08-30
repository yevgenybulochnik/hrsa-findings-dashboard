
def test_filteritems_get(client, db):
    res = client.get('/api/filteritems/')
    data = res.get_json()

    assert res.status_code is 200
    assert 'state_items' in data
    assert 'hrsa_designation_items' in data
    assert 'tag_items' in data
    assert 'year_items' in data

def test_filteritems_counts(client, db):
    res = client.get('/api/filteritems/')
    data = res.get_json()

    assert len(data['state_items']) == 59
    assert len(data['tag_items']) == 6
    assert len(data['hrsa_designation_items']) == 21
    assert len(data['year_items']) > 0
