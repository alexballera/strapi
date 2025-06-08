import React from 'react'

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateMetadataObject } from '@/lib/shared/metadata';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/context/cart-context';
import { cn } from '@/lib/utils';
import { ViewTransitions } from 'next-view-transitions';
import fetchContentType from '@/lib/strapi/fetchContentType';

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

// Default Global SEO for pages without them
export async function generateMetadata({
    params,
}: {
    params: { locale: string; slug: string };
}): Promise<Metadata> {
    const pageData = await fetchContentType(
        'global',
        {
            filters: { locale: params.locale },
            populate: "seo.metaImage",
        },
        true
    );

    const seo = pageData?.seo;
    const metadata = generateMetadataObject(seo);
    return metadata;
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {

    const pageData = await fetchContentType('global', { filters: { locale } }, true);
    
    // Handle case where no content exists for the locale yet
    // Fall back to English content temporarily
    let fallbackData = null;
    if (!pageData?.navbar || !pageData?.footer) {
        console.log(`No content found for locale: ${locale}, falling back to English`);
        fallbackData = await fetchContentType('global', { filters: { locale: 'en' } }, true);
    }
    
    const navbarData = pageData?.navbar || fallbackData?.navbar || null;
    const footerData = pageData?.footer || fallbackData?.footer || null;

    return (
        <html lang={locale}>
            <ViewTransitions>
                <CartProvider>
                    <body
                        className={cn(
                            inter.className,
                            "bg-charcoal antialiased h-full w-full"
                        )}
                    >
                        {navbarData && <Navbar data={navbarData} locale={locale} />}
                        {children}
                        {footerData && <Footer data={footerData} locale={locale} />}
                    </body>
                </CartProvider>
            </ViewTransitions>
        </html>
    );
}