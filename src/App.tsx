import { Listeners } from "./components/listeners";
import { ReactiveForm } from "./components/reactive-form";
import { SignUp } from "./components/sign-up";
import { Separator } from "./components/ui/separator";
import Typography from "./components/ui/typography";
import { UserCard } from "./components/user-card";

function App() {
  return (
    <div className="w-full h-full bg-background flex flex-col items-center py-5">
      <Typography
        variant={"h1"}
        className="my-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600"
      >
        TanStack Form Tutorial
      </Typography>
      <div className="flex flex-col space-y-5">
        <SignUp />
        <Separator />
        <ReactiveForm />
        <Separator />
        <UserCard />
        <Separator />
        <Listeners />
      </div>
    </div>
  );
}

export default App;
