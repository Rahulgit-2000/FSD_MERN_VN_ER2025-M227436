const mockReviews = [
    {
        name: "John Doe",
        rating: 5,
        comment: "Absolutely loved this book! A real page-turner from start to finish."
    },
    {
        name: "Jane Smith",
        rating: 4,
        comment: "Great story and characters. The pacing was a bit slow in the middle but overall excellent."
    },
    {
        name: "Mike Johnson",
        rating: 5,
        comment: "One of the best books I've read this year. Highly recommended!"
    },
    {
        name: "Emily Davis",
        rating: 4,
        comment: "Very insightful and well-written. I learned a lot."
    }
];

const books = [
    // Fiction
    {
        title: "The Fire Destroys Everything",
        image: "/assets/book_1.png",
        price: 15,
        description: "A gripping tale of survival and consequence. 'The Fire Destroys Everything' explores the aftermath of a devastating event and the resilience of the human spirit.",
        genre: "Fiction",
        author: "Robert K. Massie",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Presenting Melrin Hao",
        image: "/assets/book_2.png",
        price: 20,
        description: "Discover the musical journey of Melrin Hao. This biography dives into the life, struggles, and rise to fame of a music icon.",
        genre: "Fiction",
        author: "Elena Ferrante",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "The Past Diaries",
        image: "/assets/book_3.png",
        price: 10,
        description: "Secrets buried in the past never stay hidden. 'The Past Diaries' uncovers a web of mystery and romance that spans generations.",
        genre: "Fiction",
        author: "Nicholas Sparks",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Ambedkar Jayanti's Celebration",
        image: "/assets/book_4.png",
        price: 25,
        description: "A tribute to the legacy of Dr. B.R. Ambedkar. This book chronicles the celebrations and the enduring impact of his work on society.",
        genre: "Fiction",
        author: "H.G. Wells",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Journey Through Time",
        image: "/assets/book_5.png",
        price: 15,
        description: "Embark on a journey through the ages. From ancient civilizations to the modern world, this book captures the essence of human history.",
        genre: "Fiction",
        author: "Neil Gaiman",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Window to The World",
        image: "/assets/book_6.png",
        price: 18,
        description: "Books are a window to the world. This collection of stories transports readers to different cultures and landscapes.",
        genre: "Fiction",
        author: "Andy Weir",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },

    // Children
    {
        title: "Earth Day",
        image: "/assets/book_7.png",
        price: 12,
        description: "Celebrate our planet with 'Earth Day'. A fun and educational guide for kids to learn about nature and how to protect the environment.",
        genre: "Children",
        author: "Enid Blyton",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Happy World Book Day",
        image: "/assets/book_8.png",
        price: 14,
        description: "Join the celebration of reading! 'Happy World Book Day' is filled with exciting stories and activities for young bookworms.",
        genre: "Children",
        author: "Beatrix Potter",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Back to School",
        image: "/assets/book_9.png",
        price: 18,
        description: "Get ready for a new school year! 'Back to School' follows the adventures of friends as they navigate the first day of class.",
        genre: "Children",
        author: "Patricia C. Wrede",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "World Book Day: Stories",
        image: "/assets/book_10.png",
        price: 20,
        description: "A magical collection of stories to celebrate World Book Day. Perfect for bedtime reading and sparking imagination.",
        genre: "Children",
        author: "Roald Dahl",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Learn at Home",
        image: "/assets/book_11.png",
        price: 15,
        description: "Learning can happen anywhere! 'Learn at Home' provides fun and interactive lessons for curious minds.",
        genre: "Children",
        author: "Franklin W. Dixon",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Language Courses",
        image: "/assets/book_12.png",
        price: 17,
        description: "Explore new languages and cultures. This book introduces basic phrases and fun facts from around the world.",
        genre: "Children",
        author: "Dr. Seuss",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },

    // Health
    {
        title: "Be Healthy Even More",
        image: "/assets/book_13.png",
        price: 20,
        description: "Take your health to the next level. Practical tips and advice for maintaining a balanced and healthy lifestyle.",
        genre: "Health",
        author: "Dr. Caroline Leaf",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "World Health Day",
        image: "/assets/book_14.png",
        price: 18,
        description: "A guide to wellness and vitality. Celebrate World Health Day by learning how to care for your body and mind.",
        genre: "Health",
        author: "B.K.S. Iyengar",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Wild Nature Institute",
        image: "/assets/book_15.png",
        price: 15,
        description: "Discover the healing power of nature. 'Wild Nature Institute' explores the connection between the outdoors and well-being.",
        genre: "Health",
        author: "Michael Pollan",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "World Health Day (April)",
        image: "/assets/book_16.png",
        price: 22,
        description: "Focus on your health this April. Expert advice on nutrition, exercise, and mental health.",
        genre: "Health",
        author: "Matthew Walker",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Take Time to Meditate",
        image: "/assets/book_17.png",
        price: 25,
        description: "Find your inner peace. 'Take Time to Meditate' offers simple techniques for mindfulness and relaxation.",
        genre: "Health",
        author: "Joe Wicks",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Stay Healthy Stay Safe",
        image: "/assets/book_18.png",
        price: 18,
        description: "Essential tips for staying healthy and safe in today's world. A must-read for everyone.",
        genre: "Health",
        author: "Florence Williams",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },

    // Academic
    {
        title: "Knowledge at Fingertips",
        image: "/assets/book_19.png",
        price: 30,
        description: "Access a world of knowledge. This comprehensive guide covers a wide range of academic subjects.",
        genre: "Academic",
        author: "Richard Feynman",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Annual Report",
        image: "/assets/book_20.png",
        price: 25,
        description: "A detailed analysis of the year's events and achievements. Perfect for students of business and economics.",
        genre: "Academic",
        author: "Martin Gardner",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Art School",
        image: "/assets/book_21.png",
        price: 18,
        description: "Unleash your creativity. 'Art School' provides lessons and inspiration for aspiring artists.",
        genre: "Academic",
        author: "Yuval Noah Harari",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Create Your Own Business",
        image: "/assets/book_22.png",
        price: 22,
        description: "Turn your ideas into reality. A step-by-step guide to starting and managing your own business.",
        genre: "Academic",
        author: "Marie Curie",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "2022 Annual Report",
        image: "/assets/book_23.png",
        price: 28,
        description: "A retrospective on the year 2022. Key insights and data for academic research.",
        genre: "Academic",
        author: "Donald Knuth",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "World Book Day Celebration",
        image: "/assets/book_24.png",
        price: 30,
        description: "Celebrate the joy of reading. This book highlights the importance of literature in education.",
        genre: "Academic",
        author: "Stephen Hawking",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },

    // Business
    {
        title: "Psychology Therapy",
        image: "/assets/book_25.png",
        price: 22,
        description: "Understanding the human mind. 'Psychology Therapy' offers insights into mental health and therapeutic practices.",
        genre: "Business",
        author: "Peter Thiel",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Luxury Shampoo Soap",
        image: "/assets/book_26.png",
        price: 24,
        description: "The business of beauty. Learn about the marketing and production of luxury personal care products.",
        genre: "Business",
        author: "Seth Godin",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Electric Mobility Revolution",
        image: "/assets/book_27.png",
        price: 26,
        description: "The future of transportation. Explore the rise of electric vehicles and the revolution in mobility.",
        genre: "Business",
        author: "Simon Sinek",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Become a Storyteller",
        image: "/assets/book_28.png",
        price: 18,
        description: "Master the art of storytelling for business. Learn how to craft compelling narratives that sell.",
        genre: "Business",
        author: "Robert Kiyosaki",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "City Park Family Fun",
        image: "/assets/book_29.png",
        price: 22,
        description: "Creating community spaces. A guide to urban planning and the business of public recreation.",
        genre: "Business",
        author: "Chris Voss",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Toasting to Family",
        image: "/assets/book_30.png",
        price: 20,
        description: "Celebrate life's moments. A guide to event planning and the business of hospitality.",
        genre: "Business",
        author: "David Allen",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    // Religious
    {
        title: "Thinking Lighting Light",
        image: "/assets/book_31.png",
        price: 15,
        description: "Illuminating the path. A spiritual guide to finding inner light and clarity.",
        genre: "Religious",
        author: "Dalai Lama",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "The Fire Destroys (Reprise)",
        image: "/assets/book_32.png",
        price: 18,
        description: "A spiritual reflection on destruction and rebirth. Finding hope in the ashes.",
        genre: "Religious",
        author: "C.S. Lewis",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Autumn Book Fair",
        image: "/assets/book_33.png",
        price: 12,
        description: "Gathering for the harvest of wisdom. A collection of seasonal spiritual readings.",
        genre: "Religious",
        author: "Stormie Omartian",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Different Winter",
        image: "/assets/book_34.png",
        price: 20,
        description: "Finding warmth in the cold. A spiritual journey through the winter of the soul.",
        genre: "Religious",
        author: "Thomas Merton",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Electric Party Night",
        image: "/assets/book_35.png",
        price: 22,
        description: "Celebrating the divine energy. A modern take on spiritual gatherings and community.",
        genre: "Religious",
        author: "Karen Armstrong",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Echo",
        image: "/assets/book_36.png",
        price: 25,
        description: "The reverberation of truth. Listening to the echoes of ancient wisdom in modern life.",
        genre: "Religious",
        author: "Eckhart Tolle",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
];

module.exports = books;
