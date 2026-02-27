"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  BookOpen,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { modules } from "@/data/modules";
import { useToast } from "@/components/ui/use-toast";
import {
  markdownComponents,
  estimateReadingTime,
  extractHeadings,
} from "@/components/markdown-renderers";

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const moduleId = Number(params.id);
  const mod = modules.find((m) => m.id === moduleId);

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [showToc, setShowToc] = useState(false);

  const headings = useMemo(
    () => (mod ? extractHeadings(mod.content) : []),
    [mod]
  );
  const readTime = mod ? estimateReadingTime(mod.content) : 0;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bms-completed-modules");
      if (saved) setCompletedModules(JSON.parse(saved));
    } catch {}
  }, []);

  // Reading progress bar
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setReadingProgress(Math.min(100, (scrollTop / docHeight) * 100));
    }

    // Track active heading for TOC highlight
    if (headings.length > 0) {
      let current = "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = h.id;
          }
        }
      }
      setActiveHeading(current);
    }
  }, [headings]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!mod) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <p className="text-muted-foreground">Module non trouvé.</p>
        <Link href="/education">
          <Button variant="outline" className="mt-4 gap-2">
            <ArrowLeft className="h-4 w-4" /> Retour aux modules
          </Button>
        </Link>
      </div>
    );
  }

  const isCompleted = completedModules.includes(mod.id);
  const nextModule = modules.find((m) => m.id === mod.id + 1);
  const prevModule = modules.find((m) => m.id === mod.id - 1);

  const handleAnswer = (optionIdx: number) => {
    setSelectedAnswer(optionIdx);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < mod.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      const score = newAnswers.filter(
        (a, i) => a === mod.quiz[i].correctIndex
      ).length;
      if (score >= Math.ceil(mod.quiz.length * 0.6)) {
        const updated = [...new Set([...completedModules, mod.id])];
        setCompletedModules(updated);
        localStorage.setItem(
          "bms-completed-modules",
          JSON.stringify(updated)
        );
        toast({
          title: "Module complété !",
          description: `Score: ${score}/${mod.quiz.length}`,
        });
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setQuizCompleted(false);
    setShowQuiz(true);
  };

  const score = answers.filter(
    (a, i) => a === mod.quiz[i]?.correctIndex
  ).length;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowToc(false);
  };

  return (
    <>
      {/* Reading progress bar - fixed at top */}
      {!showQuiz && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-4xl space-y-6">
            {/* Breadcrumb */}
            <Link
              href="/education"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux modules
            </Link>

            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge variant="outline">{mod.level}</Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {mod.duration}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" /> {readTime} min de lecture
                </span>
                {isCompleted && (
                  <Badge className="bg-green-50 text-green-600 border-green-200">
                    Complété
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold">
                Module {mod.id} — {mod.title}
              </h1>
              <p className="text-muted-foreground mt-2">{mod.description}</p>
            </div>

            <Separator />

            {/* Mobile TOC toggle */}
            {!showQuiz && headings.length > 0 && (
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowToc(!showToc)}
                  className="gap-2 text-xs w-full justify-start"
                >
                  <List className="h-3.5 w-3.5" />
                  Table des matières ({headings.length} sections)
                </Button>
                {showToc && (
                  <nav className="mt-2 rounded-lg border border-border bg-card p-3 space-y-1">
                    {headings.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => scrollToHeading(h.id)}
                        className={`block w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                          h.level === 3 ? "pl-6" : ""
                        } ${
                          activeHeading === h.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {h.text}
                      </button>
                    ))}
                  </nav>
                )}
              </div>
            )}

            {/* Content or Quiz */}
            {!showQuiz ? (
              <>
                <div className="max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {mod.content}
                  </ReactMarkdown>
                </div>

                {/* Quiz CTA - enhanced transition */}
                <div className="relative mt-12 pt-8">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <Card className="bg-gradient-to-br from-primary/5 to-orange-50/50 border-primary/20">
                    <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Trophy className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            Prêt pour le quiz ?
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Testez vos connaissances avec {mod.quiz.length}{" "}
                            questions sur ce module. Score minimum : 60% pour
                            valider.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setShowQuiz(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        size="lg"
                        className="gap-2 shrink-0"
                      >
                        <Trophy className="h-4 w-4" /> Commencer le quiz
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : !quizCompleted ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Quiz — Question {currentQuestion + 1}/{mod.quiz.length}
                    </CardTitle>
                    <Progress
                      value={(currentQuestion / mod.quiz.length) * 100}
                      className="w-24 h-2"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">
                    {mod.quiz[currentQuestion].question}
                  </p>
                  <div className="space-y-2">
                    {mod.quiz[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors text-sm cursor-pointer ${
                          selectedAnswer === idx
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowQuiz(false);
                        setCurrentQuestion(0);
                        setSelectedAnswer(null);
                        setAnswers([]);
                      }}
                      className="text-muted-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Revenir au contenu
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswer === null}
                      className="gap-2"
                    >
                      {currentQuestion < mod.quiz.length - 1
                        ? "Suivant"
                        : "Terminer"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center space-y-4">
                  {score >= Math.ceil(mod.quiz.length * 0.6) ? (
                    <>
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                      <h2 className="text-xl font-bold">Félicitations !</h2>
                      <p className="text-muted-foreground">
                        Vous avez obtenu{" "}
                        <span className="font-semibold text-foreground">
                          {score}/{mod.quiz.length}
                        </span>
                        . Module validé !
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-16 w-16 text-red-400 mx-auto" />
                      <h2 className="text-xl font-bold">
                        Pas tout à fait...
                      </h2>
                      <p className="text-muted-foreground">
                        Score : {score}/{mod.quiz.length}. Relisez le contenu et
                        réessayez.
                      </p>
                    </>
                  )}
                  <div className="flex justify-center gap-3 pt-4">
                    <Button variant="outline" onClick={resetQuiz}>
                      Recommencer le quiz
                    </Button>
                    {nextModule && (
                      <Button
                        onClick={() =>
                          router.push(`/education/${nextModule.id}`)
                        }
                        className="gap-2"
                      >
                        Module suivant <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              {prevModule ? (
                <Link href={`/education/${prevModule.id}`}>
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Module {prevModule.id}
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              {nextModule && (
                <Link href={`/education/${nextModule.id}`}>
                  <Button variant="outline" className="gap-2">
                    Module {nextModule.id} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Floating TOC - desktop only */}
          {!showQuiz && headings.length > 0 && (
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-12">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <List className="h-3.5 w-3.5" />
                  Sur cette page
                </h2>
                <nav className="space-y-0.5 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => scrollToHeading(h.id)}
                      className={`block w-full text-left text-[13px] py-1.5 transition-all border-l-2 ${
                        h.level === 3 ? "pl-5" : "pl-3"
                      } ${
                        activeHeading === h.id
                          ? "border-primary text-primary font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      <span className="line-clamp-2 leading-snug">
                        {h.text}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
