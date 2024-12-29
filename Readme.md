# Hackend

Hackend is a web-based platform designed to streamline the process of hosting and managing hackathon competitions online. With Hackend, organizers can effortlessly create events, manage participants, and oversee project submissions, while participants enjoy a seamless experience from registration to project submission.

---

## Features

### For Organizers

- [ ] **Event Creation:** Set up and customize hackathons with a user-friendly interface.
- [ ] **Team Management:** Enable participants to form and manage teams easily.
- [ ] **Project Submission Portal:** Accept, review, and track submissions in real-time.
- [ ] **Judging Dashboard:** Allow judges to score and provide feedback on projects.
- [ ] **Customizable Schedule:** Share event schedules and updates with participants.
- [ ] **Communication Tools:** Send announcements and reminders directly to participants.

### For Participants

- [ ] **Easy Registration:** Sign up individually or as a team.
- [ ] **Team Formation:** Find teammates with similar interests and skills.
- [ ] **Resource Hub:** Access important event resources, including rules, FAQs, and mentors.
- [ ] **Submission Tracking:** Submit projects and receive feedback in one place.
- [ ] **Live Updates:** Stay updated on event progress and important announcements.

---

## Tech Stack

- **Frontend:** Built with [Remix](https://remix.run) for a fast and reactive user experience.
- **Backend:** Powered by [Bun](https://bun.sh) for optimal performance and rapid development.



---

## Installation

### Prerequisites

- Node.js 16+
- Bun installed globally (`bun install -g bun`)
- A PostgreSQL database 

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hackend.git
   cd hackend
   ```
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up your `.env` file with the necessary environment variables:
   ```env
   DATABASE_URL=your-database-url
   JWT_SECRET=your-secret-key
   ```
4. Run migrations (if applicable):
   ```bash
   bun run db:migrate
   ```
5. Start the development server:
   ```bash
   bun dev
   ```
6. Open your browser and navigate to `http://localhost:3000`.

---

## Contributing

We welcome contributions to Hackend! Follow these steps to get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on the main repository.

---

## License

Hackend is open-source software licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Built with passion for hackathon communities around the globe.
- Special thanks to the open-source community for their tools and inspiration.
