<?php

namespace App\Actions;

use PHPSandbox\PHPSandbox;

final class RunCode
{
    public function handle(string $code): array
    {
        $status = 200;
        $output = '';

        $sandbox = new PHPSandbox();

        try {
            ob_start();

            $sandbox->execute($code);
            $output = ob_get_clean();
        } catch (\Exception $e) {

            $status = 500;
            $output = $e->getMessage();
        }

        return compact('status', 'output');
    }
}
