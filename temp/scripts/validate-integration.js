#!/usr/bin/env node
"use strict";
/**
 * SCRIPT DE VALIDACIÓN: Integración del Sistema Híbrido
 *
 * Este script ejecuta todas las validaciones necesarias para confirmar
 * que la integración del EnhancedHybridFilterEngine funciona correctamente
 */
Object.defineProperty(exports, "__esModule", { value: true });
const integration_validator_1 = require("../validation/integration-validator");
async function main() {
    console.log('🚀 Iniciando validación del sistema híbrido...\n');
    try {
        // Ejecutar validación completa
        const isValid = await (0, integration_validator_1.validateIntegration)();
        if (isValid) {
            console.log('\n✅ ¡VALIDACIÓN EXITOSA!');
            console.log('   El sistema híbrido está correctamente integrado');
            console.log('   y listo para usar en producción.\n');
            console.log('📚 Próximos pasos:');
            console.log('   1. Revisa la documentación en: docs/INTEGRATION_GUIDE.md');
            console.log('   2. Prueba los ejemplos en: examples/enhanced-integration-demo.tsx');
            console.log('   3. Ejecuta tests con: npm test');
            console.log('   4. Activa feature flags gradualmente\n');
            process.exit(0);
        }
        else {
            console.log('\n❌ VALIDACIÓN FALLÓ');
            console.log('   Revisa los errores arriba y corrige los problemas.');
            console.log('   Consulta la documentación para más detalles.\n');
            process.exit(1);
        }
    }
    catch (error) {
        console.error('\n💥 ERROR INESPERADO durante la validación:');
        console.error(error);
        console.log('\n🔧 Posibles soluciones:');
        console.log('   1. Verifica que todas las dependencias estén instaladas');
        console.log('   2. Asegúrate de que el código compile sin errores');
        console.log('   3. Revisa la configuración de TypeScript');
        console.log('   4. Consulta los logs detallados arriba\n');
        process.exit(1);
    }
}
// Información adicional si se ejecuta directamente
if (require.main === module) {
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║                VALIDADOR DE INTEGRACIÓN HÍBRIDA             ║');
    console.log('║                                                              ║');
    console.log('║  Este script valida que el EnhancedHybridFilterEngine       ║');
    console.log('║  esté correctamente integrado con el sistema existente      ║');
    console.log('║  usando feature flags para una migración segura.           ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log('');
    main().catch(error => {
        console.error('Error fatal:', error);
        process.exit(1);
    });
}
