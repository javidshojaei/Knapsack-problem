// تابعی برای مرتب‌سازی آیتم‌ها بر اساس نسبت ارزش به وزن به صورت نزولی
// function sortItemsByValuePerWeight(items) {
//     return items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
// }

// تابع اصلی الگوریتم کوله‌پشتی کسری
function fractionalKnapsack(maxWeight, weights, values) {
    const n = weights.length;
    let items = [];

    // ساخت آرایه‌ای از آیتم‌ها با وزن‌ها و ارزش‌های مربوطه و ایندکس اصلی‌شان
    for (let i = 0; i < n; i++) {
        items.push({
            weight: weights[i],
            value: values[i],
            index: i
        });
    }

    // مرتب‌سازی آیتم‌ها بر اساس نسبت ارزش به وزن
    // items = sortItemsByValuePerWeight(items);

    let totalValue = 0;
    let fractions = new Array(n).fill(0);

    // پیمایش آیتم‌ها و انتخاب بهترین‌ها
    for (let i = 0; i < n; i++) {
        if (maxWeight === 0) break;

        if (items[i].weight <= maxWeight) {
            // اگر آیتم به طور کامل در کوله‌پشتی جا شود
            maxWeight -= items[i].weight;
            totalValue += items[i].value;
            fractions[items[i].index] = 1;
        } else {
            // اگر آیتم به صورت کسری در کوله‌پشتی جا شود
            fractions[items[i].index] = maxWeight / items[i].weight;
            totalValue += items[i].value * fractions[items[i].index];
            maxWeight = 0;
        }
    }

    return {
        totalValue: totalValue,
        fractions: fractions
    };
}

// گرفتن ورودی‌ها از کاربر
const maxWeight = parseFloat(prompt("لطفا حداکثر وزن کوله‌پشتی را وارد کنید:"));
const weights = prompt("لطفا وزن‌های آیتم‌ها را وارد کنید (با کاما جدا کنید):").split(',').map(Number);
const values = prompt("لطفا ارزش‌های آیتم‌ها را وارد کنید (با کاما جدا کنید):").split(',').map(Number);

// اجرای الگوریتم و نمایش نتایج
const result = fractionalKnapsack(maxWeight, weights, values);
console.log("حداکثر سود: " + result.totalValue);
console.log("مقادیر کسری آیتم‌ها: " + result.fractions);
y