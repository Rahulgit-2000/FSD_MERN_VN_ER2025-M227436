const connectDB = require('./config/connect');
const Seller = require('./models/Seller/SellerSchema');
const Book = require('./models/Seller/BookSchema');
const Order = require('./models/Order');
const dotenv = require('dotenv');

dotenv.config();

const inspectOrders = async () => {
    try {
        await connectDB();
        console.log('Connected to DB');

        const sellers = await Seller.find({});
        console.log(`Total Sellers: ${sellers.length}`);

        for (const seller of sellers) {
            console.log(`\nChecking Seller: ${seller.email} (${seller.name})`);

            const myBooks = await Book.find({ sellerId: seller._id }).select('_id');
            const myBookIds = myBooks.map(book => book._id);
            console.log(`Books: ${myBookIds.length}`);

            const orders = await Order.find({
                'orderItems.product': { $in: myBookIds }
            });

            console.log(`Total Orders: ${orders.length}`);

            if (orders.length > 0) {
                const now = new Date();
                const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const firstDayPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const lastDayPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

                let currentMonthCount = 0;
                let prevMonthCount = 0;

                orders.forEach(order => {
                    const orderDate = new Date(order.createdAt);
                    if (orderDate >= firstDayCurrentMonth && orderDate <= now) {
                        currentMonthCount++;
                    } else if (orderDate >= firstDayPrevMonth && orderDate <= lastDayPrevMonth) {
                        prevMonthCount++;
                    }
                    console.log(` - Order Date: ${order.createdAt}`);
                });
                console.log(`Current Month Orders: ${currentMonthCount}`);
                console.log(`Previous Month Orders: ${prevMonthCount}`);
            }
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

inspectOrders();
