import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { CircuitBoard, Code, Zap, CheckCircle2, ArrowRight, Cpu } from "lucide-react";
const Index = () => {
  return <div className="flex min-h-screen flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master Digital Circuit Design with HDL
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Solve hardware design problems, improve your HDL coding skills, and practice 
                  digital circuit implementation in a supportive online environment.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/problems">
                  <Button size="lg" className="gap-1.5">
                    Explore Problems
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/learn/hdl-basics">
                  <Button size="lg" variant="outline" className="gap-1.5">
                    Learn HDL Basics
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-64 md:h-full">
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
                  <div className="p-4 font-mono text-xs text-blue-700 dark:text-blue-300 h-full overflow-auto">
                    <pre>
                    {`module counter_4bit(
  input clk,
  input reset,
  output reg [3:0] count
);
  
  always @(posedge clk) begin
    if (reset)
      count <= 4'b0000;
    else
      count <= count + 1;
  end

endmodule`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col gap-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900">
                <Code className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold">Practice HDL Coding</h3>
              <p className="text-gray-500 dark:text-gray-400">Write Verilog, VHDL, and System Verilog code to implement digital circuits in our interactive coding environment.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900">
                <Cpu className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold">Diverse Problem Sets</h3>
              <p className="text-gray-500 dark:text-gray-400">
                From simple combinational circuits to complex state machines, our problems cover 
                all aspects of digital design.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900">
                <CheckCircle2 className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold">Instant Verification</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Test your HDL code against predefined test cases and get immediate feedback on 
                your solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-50 dark:bg-blue-900/20 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to improve your HDL skills?
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community of hardware designers and level up your digital circuit design expertise.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/register">
                <Button size="lg" className="gap-1.5 text-white text-center rounded-sm">
                  Get Started
                  <Zap className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t bg-background mt-auto">
        <div className="container flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between md:py-8">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-5 w-5 text-blue-600" />
            <p className="text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-base">
              © 2023 HDLCode. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="/about" className="text-sm hover:underline underline-offset-4">
              About
            </Link>
            <Link to="/contact" className="text-sm hover:underline underline-offset-4">
              Contact
            </Link>
            <a href="https://github.com/hdlcode/hdlcode" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline underline-offset-4">
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>;
};
export default Index;