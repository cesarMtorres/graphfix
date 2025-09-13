<?php

namespace App\Actions;

use PHPSandbox\PHPSandbox;

final class RunCode
{
    public function handle(string $code): array
    {
        $status = 200;
        $output = '';
        $errors = [];
        $logs = [];

        // Limpiar etiquetas PHP
        $cleanCode = $this->cleanPhpTags($code);

        $sandbox = new PHPSandbox;
        $sandbox->error_level = E_ALL;
        $sandbox->allow_classes = true;
        $sandbox->allow_objects = true;
        $sandbox->allow_functions = true;
        $sandbox->allow_constants = true;

        try {
            ob_start();
            $result = $sandbox->execute($cleanCode);

            if ($result !== null) {
                echo $result;
            }

            $output = ob_get_clean();
        } catch (\ParseError $e) {
            $status = 400;
            $output = ob_get_clean();

            $errors[] = [
                'type' => 'Parse Error',
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => 'sandboxed code',
                'trace' => $e->getTraceAsString(),
            ];
        } catch (\Throwable $e) {
            $status = 500;
            $output = ob_get_clean();

            $errors[] = [
                'type' => get_class($e),
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => 'sandboxed code',
                'trace' => $e->getTraceAsString(),
            ];
        }

        return [
            'status' => $status,
            'output' => $output,
            'errors' => $errors,
            'logs' => $logs,
            'success' => empty($errors),
        ];
    }

    private function cleanPhpTags(string $code): string
    {
        // Remover etiquetas de apertura PHP
        $code = preg_replace('/^\s*<\?php\s*/', '', $code);
        $code = preg_replace('/^\s*<\?\s*/', '', $code);

        // Remover etiquetas de cierre PHP
        $code = preg_replace('/\s*\?>\s*$/', '', $code);

        // Limpiar espacios extra
        $code = trim($code);

        return $code;
    }
}
