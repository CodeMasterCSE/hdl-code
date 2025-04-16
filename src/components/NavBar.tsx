
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { CircuitBoard, BookOpen, PuzzleIcon, ChevronDown, Github, BookMarked, User, LogOut } from "lucide-react";
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
          <CircuitBoard className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl">HDLCode</span>
        </Link>
        
        <NavigationMenu className="mx-6 hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/problems">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <PuzzleIcon className="mr-2 h-4 w-4" />
                  Problems
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <BookOpen className="mr-2 h-4 w-4" />
                Learn
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-100 to-blue-50 p-6 no-underline outline-none focus:shadow-md"
                        href="/learn/hdl-basics"
                      >
                        <BookMarked className="h-6 w-6 text-blue-500" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          HDL Fundamentals
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Learn the basics of hardware description languages and digital circuit design.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link to="/learn/verilog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Verilog</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Master Verilog HDL with tutorials and examples
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/vhdl" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">VHDL</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        VHDL language reference and practice
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/system-verilog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">SystemVerilog</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Advanced concepts in SystemVerilog
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {user && (
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/problems" className="md:hidden">
            <Button variant="ghost" size="icon">
              <PuzzleIcon className="h-5 w-5" />
            </Button>
          </Link>
          
          <a href="https://github.com/hdlcode/hdlcode" target="_blank" rel="noopener noreferrer">
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
