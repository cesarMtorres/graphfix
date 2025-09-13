<?php

/**
 * @test
 */
test('can run isolated code', function (): void {

    $response = $this->postJson('api/run-php', [
        'code' => '<?php echo "Hola Mundo!";',
    ]);
    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'output' => 'Hola Mundo!',
        ]);
});
