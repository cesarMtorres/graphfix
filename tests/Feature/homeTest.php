<?php

test('hola mundo', function () {
    $response = $this->get('/hola-mundo');

    $response->assertStatus(200);
});
