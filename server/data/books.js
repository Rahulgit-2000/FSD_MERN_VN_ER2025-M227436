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
        title: "The Great Escape",
        image: "/assets/book_1.png",
        price: 15,
        description: "In 'The Great Escape', readers are plunged into a high-stakes adventure where every decision counts. The protagonist, a daring escape artist, finds themselves trapped in an impossible fortress. With time running out and enemies closing in, they must rely on their wits and a ragtag team of allies to break free. This gripping tale explores themes of resilience, freedom, and the indomitable human spirit.",
        genre: "Fiction",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Shadows of the Past",
        image: "/assets/book_2.png",
        price: 20,
        description: "Deep within the ancient Whispering Forest lies a secret that has been buried for centuries. 'Shadows of the Past' follows a young historian who stumbles upon a cryptic journal that hints at a lost civilization. As she delves deeper, she uncovers dark truths that threaten to rewrite history. This atmospheric mystery weaves together folklore, suspense, and a touch of the supernatural.",
        genre: "Fiction",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Eternal Love",
        image: "/assets/book_3.png",
        price: 10,
        description: "A romance that defies the boundaries of time itself. 'Eternal Love' tells the heart-wrenching yet beautiful story of two souls destined to meet across different eras. From the gas-lit streets of Victorian London to the neon-soaked avenues of a future metropolis, their love story is a testament to the enduring power of connection. Perfect for fans of epic, sweeping romances.",
        genre: "Fiction",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "The Time Traveler's Quest",
        image: "/assets/book_4.png",
        price: 25,
        description: "When a scientific experiment goes wrong, Dr. Alex Thorne is hurled through the time stream. 'The Time Traveler's Quest' is a fast-paced sci-fi adventure that takes readers from the dinosaur-inhabited past to a post-apocalyptic future. Alex must navigate these dangerous eras to find a way home, all while trying to prevent a paradox that could unravel the fabric of reality.",
        genre: "Fiction",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Mystic Tales",
        image: "/assets/book_5.png",
        price: 15,
        description: "Step into a world of magic and wonder with 'Mystic Tales'. This anthology collects short stories featuring enchanting creatures, powerful wizards, and brave heroes. Each tale offers a unique glimpse into a realm where the impossible becomes possible. It's a delightful collection for anyone who loves fantasy and the power of imagination.",
        genre: "Fiction",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Into the Unknown",
        image: "/assets/book_6.png",
        price: 18,
        description: "A survival saga set in the uncharted territories of a newly discovered planet. 'Into the Unknown' follows a team of explorers who crash-land on a hostile world. Cut off from communication and facing alien wildlife, they must band together to survive. This gritty and realistic sci-fi novel examines the limits of human endurance and the drive to explore.",
        genre: "Fiction",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },

    // Children
    {
        title: "Adventures in Toyland",
        image: "/assets/book_7.png",
        price: 12,
        description: "What happens when the lights go out in the toy store? 'Adventures in Toyland' reveals the secret lives of toys. Join Teddy, the brave bear, and his friends as they embark on nightly escapades, solving problems and helping each other. This charming story celebrates friendship, creativity, and the magic of childhood play.",
        genre: "Children",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "The Talking Animals",
        image: "/assets/book_8.png",
        price: 14,
        description: "In a magical forest, the animals can talk! 'The Talking Animals' is a collection of fables where wise owls, tricky foxes, and kind rabbits share their life lessons. Each story is designed to teach children about values like honesty, kindness, and sharing, all wrapped up in entertaining animal adventures.",
        genre: "Children",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Princess of the Enchanted Forest",
        image: "/assets/book_9.png",
        price: 18,
        description: "Princess Lily isn't your typical princess. She prefers climbing trees to tea parties. In 'Princess of the Enchanted Forest', Lily discovers a hidden magical grove that is in danger. She must use her courage and kindness to save the forest and its magical inhabitants. A story about being true to yourself and protecting nature.",
        genre: "Children",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Jack and the Giant Adventure",
        image: "/assets/book_10.png",
        price: 20,
        description: "A fresh retelling of the classic Jack and the Beanstalk. 'Jack and the Giant Adventure' adds new twists and turns to the familiar tale. Jack climbs the beanstalk not just for treasure, but to rescue his village from a spell. Full of humor and excitement, this book is perfect for young readers looking for a big adventure.",
        genre: "Children",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "The Lost Treasure Map",
        image: "/assets/book_11.png",
        price: 15,
        description: "Siblings Mia and Ben find an old map in their attic. 'The Lost Treasure Map' follows them on a backyard treasure hunt that turns into a real adventure. They solve riddles, overcome obstacles, and learn that the real treasure is the fun they have together. An engaging mystery for junior detectives.",
        genre: "Children",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Galaxy Explorers",
        image: "/assets/book_12.png",
        price: 17,
        description: "Blast off with the 'Galaxy Explorers'! A group of kid astronauts travels the solar system, learning about planets, stars, and space travel. This educational yet exciting book combines scientific facts with a fun narrative, inspiring the next generation of space enthusiasts.",
        genre: "Children",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },

    // Health
    {
        title: "The Healthy Mind",
        image: "/assets/book_13.png",
        price: 20,
        description: "Mental health is just as important as physical health. 'The Healthy Mind' offers practical strategies for managing stress, anxiety, and negative thoughts. Drawing on cognitive behavioral therapy and mindfulness, this book provides a toolkit for building resilience and achieving mental clarity.",
        genre: "Health",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Yoga for Beginners",
        image: "/assets/book_14.png",
        price: 18,
        description: "Start your yoga journey with confidence. 'Yoga for Beginners' breaks down essential poses with clear instructions and photos. It explains the benefits of each pose and offers modifications for different flexibility levels. Beyond the physical, it introduces the calming breathwork and philosophy of yoga.",
        genre: "Health",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Nutrition Made Easy",
        image: "/assets/book_15.png",
        price: 15,
        description: "Confused by conflicting diet advice? 'Nutrition Made Easy' simplifies the science of food. Learn about macronutrients, vitamins, and how to build a balanced plate. This book focuses on sustainable, healthy eating habits rather than restrictive diets, helping you fuel your body effectively.",
        genre: "Health",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "The Power of Sleep",
        image: "/assets/book_16.png",
        price: 22,
        description: "Sleep is the foundation of good health. 'The Power of Sleep' explores the science of why we sleep and what happens when we don't get enough. It offers evidence-based tips for improving sleep hygiene, tackling insomnia, and waking up refreshed. Essential reading for anyone wanting to boost their energy and well-being.",
        genre: "Health",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Fit in 30 Days",
        image: "/assets/book_17.png",
        price: 25,
        description: "Transform your fitness in just one month. 'Fit in 30 Days' provides a comprehensive workout plan that combines strength training, cardio, and flexibility exercises. With daily routines that take less than 30 minutes, this program is designed for busy lifestyles. Includes progress trackers and nutritional tips.",
        genre: "Health",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Healing with Nature",
        image: "/assets/book_18.png",
        price: 18,
        description: "Reconnect with the natural world to heal your mind and body. 'Healing with Nature' discusses the therapeutic benefits of spending time outdoors, from forest bathing to gardening. It explores how nature can lower blood pressure, reduce stress, and improve mood, offering simple ways to incorporate nature into your daily life.",
        genre: "Health",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },

    // Academic
    {
        title: "Introduction to Physics",
        image: "/assets/book_19.png",
        price: 30,
        description: "Unlock the mysteries of the universe with 'Introduction to Physics'. This textbook covers the fundamental principles of mechanics, thermodynamics, electromagnetism, and optics. Written in clear, accessible language with plenty of examples and diagrams, it's the perfect resource for students and curious minds alike.",
        genre: "Academic",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Mathematics Made Simple",
        image: "/assets/book_20.png",
        price: 25,
        description: "Math doesn't have to be intimidating. 'Mathematics Made Simple' takes a step-by-step approach to explaining concepts from algebra to calculus. With real-world applications and practice problems, this book helps readers build confidence and mastery in mathematics.",
        genre: "Academic",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "History of the Modern World",
        image: "/assets/book_21.png",
        price: 18,
        description: "A comprehensive overview of global history from the 18th century to the present. 'History of the Modern World' examines the political, social, and economic forces that have shaped our contemporary society. From revolutions to world wars, this book provides a nuanced understanding of our shared past.",
        genre: "Academic",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Chemistry Experiments for Beginners",
        image: "/assets/book_22.png",
        price: 22,
        description: "Put on your safety goggles and get ready to experiment! 'Chemistry Experiments for Beginners' contains safe and fun experiments that can be done at home or in the classroom. Learn about chemical reactions, states of matter, and the periodic table through hands-on activities.",
        genre: "Academic",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "The Art of Programming",
        image: "/assets/book_23.png",
        price: 28,
        description: "Master the logic and creativity of coding. 'The Art of Programming' introduces the core concepts of computer science using modern languages like Python and JavaScript. It focuses on problem-solving skills and algorithmic thinking, preparing readers for a career in tech or just a new hobby.",
        genre: "Academic",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Exploring the Universe",
        image: "/assets/book_24.png",
        price: 30,
        description: "A visual guide to the cosmos. 'Exploring the Universe' features stunning photography from telescopes and space missions. It covers topics like black holes, galaxies, and the search for extraterrestrial life. A beautiful coffee table book that is also packed with scientific knowledge.",
        genre: "Academic",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },

    // Business
    {
        title: "Entrepreneurship 101",
        image: "/assets/book_25.png",
        price: 22,
        description: "Have a great business idea? 'Entrepreneurship 101' is your roadmap to turning it into reality. This guide covers everything from writing a business plan to securing funding and marketing your product. Filled with case studies of successful startups, it offers practical advice for aspiring founders.",
        genre: "Business",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Marketing Strategies",
        image: "/assets/book_26.png",
        price: 24,
        description: "In the digital age, marketing is evolving rapidly. 'Marketing Strategies' explores the latest trends in social media, content marketing, and SEO. It teaches you how to build a brand, reach your target audience, and measure success. Essential for business owners and marketing professionals.",
        genre: "Business",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Leadership for Success",
        image: "/assets/book_27.png",
        price: 26,
        description: "Great leaders are made, not born. 'Leadership for Success' identifies the key traits of effective leaders, such as empathy, decisiveness, and vision. It provides exercises to develop these skills and advice on managing teams, resolving conflict, and inspiring others.",
        genre: "Business",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Finance for Beginners",
        image: "/assets/book_28.png",
        price: 18,
        description: "Take control of your financial future. 'Finance for Beginners' demystifies topics like budgeting, investing, and taxes. Whether you want to get out of debt, save for a house, or plan for retirement, this book offers clear, actionable advice to help you achieve financial freedom.",
        genre: "Business",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "The Art of Negotiation",
        image: "/assets/book_29.png",
        price: 22,
        description: "Negotiation is a part of everyday life. 'The Art of Negotiation' teaches you how to get what you want while maintaining good relationships. Learn strategies for active listening, finding common ground, and closing deals. Useful for business, salary talks, or even deciding where to eat dinner.",
        genre: "Business",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Time Management Mastery",
        image: "/assets/book_30.png",
        price: 20,
        description: "Stop procrastinating and start achieving. 'Time Management Mastery' introduces proven techniques like the Pomodoro method and time blocking. It helps you prioritize tasks, eliminate distractions, and create a workflow that maximizes productivity without leading to burnout.",
        genre: "Business",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    // Religious
    {
        title: "The Path to Enlightenment",
        image: "/assets/book_31.png",
        price: 15,
        description: "A spiritual guide for the modern seeker. 'The Path to Enlightenment' draws on ancient wisdom traditions to offer a roadmap for personal growth. It explores concepts like karma, dharma, and liberation, encouraging readers to look within to find peace and purpose.",
        genre: "Religious",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Stories from the Book",
        image: "/assets/book_32.png",
        price: 18,
        description: "A retelling of classic religious narratives. 'Stories from the Book' brings to life the parables and events that have shaped faith for generations. Written with a focus on the moral and spiritual lessons, these stories are accessible and inspiring for readers of all backgrounds.",
        genre: "Religious",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "The Power of Prayer",
        image: "/assets/book_33.png",
        price: 12,
        description: "Explore the profound practice of prayer. 'The Power of Prayer' discusses different forms of prayer, from petition to meditation. It shares testimonials of answered prayers and offers guidance on how to cultivate a consistent and meaningful prayer life.",
        genre: "Religious",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "The Life of Man",
        image: "/assets/book_34.png",
        price: 20,
        description: "A philosophical and spiritual examination of the human condition. 'The Life of Man' asks the big questions: Why are we here? What is our purpose? Drawing on theology and philosophy, it offers a contemplative look at the stages of life and the search for meaning.",
        genre: "Religious",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
    {
        title: "Understanding Religious",
        image: "/assets/book_35.png",
        price: 22,
        description: "A comparative study of world religions. 'Understanding Religious' provides an objective overview of the beliefs, practices, and history of major faiths. It promotes interfaith understanding and highlights the common threads of compassion and ethics that unite them.",
        genre: "Religious",
        author: "Unknown",
        countInStock: 10,
        popular: false,
        reviews: mockReviews
    },
    {
        title: "Spiritual Wisdom",
        image: "/assets/book_36.png",
        price: 25,
        description: "A daily devotional for spiritual nourishment. 'Spiritual Wisdom' offers a collection of quotes, affirmations, and short reflections for every day of the year. It's a companion for anyone looking to start their day with a moment of mindfulness and inspiration.",
        genre: "Religious",
        author: "Unknown",
        countInStock: 10,
        popular: true,
        reviews: mockReviews
    },
];

module.exports = books;
