// Side-effect import keeps this file a module so the augmentation below
// merges into `@inertiajs/core` instead of shadowing its real exports.
import '@inertiajs/core';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            contactEmail: string;
            [key: string]: unknown;
        };
    }
}
