export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container flex items-center justify-center h-16">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} CampusLost. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
