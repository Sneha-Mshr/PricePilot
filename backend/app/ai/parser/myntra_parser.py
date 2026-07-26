from playwright.sync_api import Page


class MyntraParser:

    def parse(self, page: Page):

        products = []

        # Myntra product cards
        cards = page.locator(".product-base")

        if cards.count() == 0:
            # Fallback selector
            cards = page.locator("[data-testid='listingCard']")

        if cards.count() == 0:
            cards = page.locator(".product-productMetaInfo")

        if cards.count() == 0:
            print("Myntra: No product cards found")
            return products

        print(f"Myntra: Total Cards Found: {cards.count()}")

        count = min(cards.count(), 8)

        for i in range(count):
            card = cards.nth(i)

            try:
                # Brand + Title
                brand = ""
                title = ""

                try:
                    brand_el = card.locator(".product-brand")
                    if brand_el.count() > 0:
                        brand = brand_el.inner_text()
                except:
                    pass

                try:
                    title_el = card.locator(".product-product")
                    if title_el.count() > 0:
                        title = title_el.inner_text()
                except:
                    pass

                if not title and not brand:
                    continue

                full_title = f"{brand} {title}".strip()

            except:
                continue

            try:
                # Price - Myntra shows discounted price
                price = ""
                price_selectors = [
                    ".product-discountedPrice",
                    ".product-strike + span",
                    ".product-price .product-discountedPrice",
                ]
                for sel in price_selectors:
                    try:
                        el = card.locator(sel).first
                        if el.count() > 0:
                            price = el.inner_text()
                            if price:
                                price = price.replace("Rs.", "").replace("₹", "").replace(",", "").strip()
                                break
                    except:
                        continue

                # Fallback to any price element
                if not price:
                    try:
                        price_container = card.locator(".product-price")
                        if price_container.count() > 0:
                            price_text = price_container.inner_text()
                            # Extract first number
                            import re
                            numbers = re.findall(r'[\d,]+', price_text)
                            if numbers:
                                price = numbers[0].replace(",", "")
                    except:
                        pass
            except:
                price = ""

            try:
                # URL
                href = card.locator("a").first.get_attribute("href")
                if href:
                    if href.startswith("/"):
                        url = "https://www.myntra.com" + href
                    elif not href.startswith("http"):
                        url = "https://www.myntra.com/" + href
                    else:
                        url = href
                else:
                    url = ""
            except:
                url = ""

            try:
                # Image
                img_el = card.locator("img").first
                image = img_el.get_attribute("src") or img_el.get_attribute("data-src") or ""
            except:
                image = ""

            try:
                # Rating
                rating = ""
                rating_el = card.locator(".product-ratingsContainer span")
                if rating_el.count() > 0:
                    rating = rating_el.first.inner_text()
            except:
                rating = ""

            products.append({
                "title": full_title,
                "price": price,
                "url": url,
                "image": image,
                "rating": rating,
                "source": "Myntra",
            })

        return products
