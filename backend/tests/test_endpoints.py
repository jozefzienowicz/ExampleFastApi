def test_empty_favourite_codes(client):
    response = client.get("/api/favourite_zip_code/12345")

    assert response.status_code == 200
    assert response.json() == []

def test_create_favourite_code(client):
    data = {
        name: 'test_name',
        code: '12345',
        user_cookie: '54321',
    }
    response = client.post(
        "/api/favourite_zip_code/",
        json = data,
    )

    assert response.status_code == 200

    response_json = response.json()

    assert response_json['name'] == data['name']
    assert response_json['code'] == data['code']
    assert response_json['user_cookie'] == data['user_cookie']
    assert 'id' in response_json.keys()

def test_delete_favourite_code(client):
    data = {
        name: 'test_name',
        code: '12345',
        user_cookie: '54321',
    }
    response = client.post(
        "/api/favourite_zip_code/",
        json = data,
    )
    response_json = response.json()
    new_zip_code_id = response_json['id']

    response = client.delete(f"/api/favourite_zip_code/{new_zip_code_id}")
    assert response.status_code == 200
    assert response.json() == {"ok": True}
