
def test_records_get(client, db):
    res = client.get('/api/records/')
    data = res.get_json(force=True)

    assert res.status_code is 200
    assert len(data) == 3

def test_records_get_content(client, db):
    res = client.get('/api/records/')
    data = res.get_json(force=True)
    import pprint

    for record in data:
        assert 'cap_status' in record
        assert 'closure_date' in record
        assert 'entity' in record
        assert 'entity_contact' in record
        assert 'full_year' in record
        assert 'hrsa_des' in record
        assert 'hrsa_id' in record
        assert 'opa_findings' in record
        assert 'sanction' in record
        assert 'state' in record
        assert 'year' in record
