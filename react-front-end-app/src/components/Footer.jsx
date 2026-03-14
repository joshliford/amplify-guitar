import { Link } from "react-router";

export default function Footer() {
  return (
    <div>
      <footer className="flex w-full justify-center p-2 border-t-2 border-border bg-(--bg-surface)">
        <p className="text-(--text-med) text-sm">
          &copy; 2025 Amplify | Gamified Guitar Learning Dashboard {"| "}
          <Link
            to={"https://github.com/joshliford"}
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </Link>
          {" | "}
          <Link
            to={"https://joshliford.github.io/"}
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            Portfolio
          </Link>
          {" | "}
          Designed and Built by Josh Liford
        </p>
      </footer>
    </div>
  );
}
