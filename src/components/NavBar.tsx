import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { CircuitBoard, BookOpen, PuzzleIcon, Github, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <CircuitBoard className="h-10 w-10 text-blue-600" />
          <span className="font-bold text-4xl">HDLCode</span>
        </Link>
        
        <NavigationMenu className="mx-6 hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/problems" className={navigationMenuTriggerStyle()}>
                  <PuzzleIcon className="mr-2 h-4 w-4" />
                  Problems
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                <Link to="/learning" className={navigationMenuTriggerStyle()}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn
                      </Link>
                    </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center space-x-2 ml-auto">
          <Link to="/problems" className="md:hidden">
            <Button variant="ghost" size="icon">
              <PuzzleIcon className="h-5 w-5" />
            </Button>
          </Link>
          
          <a href="https://github.com/CodeMasterCSE/hdl-code" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={handleSignOut} variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;