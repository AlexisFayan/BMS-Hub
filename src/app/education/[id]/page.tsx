"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { modules } from "@/data/modules";
import { useToast } from "@/components/ui/use-toast";

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

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bms-completed-modules");
      if (saved) setCompletedModules(JSON.parse(saved));
    } catch {}
  }, []);

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
      const score = newAnswers.filter((a, i) => a === mod.quiz[i].correctIndex).length;
      if (score >= Math.ceil(mod.quiz.length * 0.6)) {
        const updated = [...new Set([...completedModules, mod.id])];
        setCompletedModules(updated);
        localStorage.setItem("bms-completed-modules", JSON.stringify(updated));
        toast({ title: "Module complété !", description: `Score: ${score}/${mod.quiz.length}` });
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

  const score = answers.filter((a, i) => a === mod.quiz[i]?.correctIndex).length;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Link href="/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour aux modules
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline">{mod.level}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {mod.duration}
          </span>
          {isCompleted && <Badge className="bg-green-50 text-green-600 border-green-200">Complété</Badge>}
        </div>
        <h1 className="text-2xl font-bold">Module {mod.id} — {mod.title}</h1>
        <p className="text-muted-foreground mt-1">{mod.description}</p>
      </div>

      <Separator />

      {/* Content or Quiz */}
      {!showQuiz ? (
        <>
          <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-code:bg-muted prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:text-foreground prose-li:text-foreground/80 prose-table:text-sm prose-th:text-left prose-th:p-2 prose-th:border-b prose-td:p-2 prose-td:border-b">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{mod.content}</ReactMarkdown>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Prêt pour le quiz ?</h3>
                <p className="text-sm text-muted-foreground">Testez vos connaissances avec {mod.quiz.length} questions.</p>
              </div>
              <Button onClick={() => setShowQuiz(true)} className="gap-2">
                <Trophy className="h-4 w-4" /> Commencer le quiz
              </Button>
            </CardContent>
          </Card>
        </>
      ) : !quizCompleted ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Quiz — Question {currentQuestion + 1}/{mod.quiz.length}</CardTitle>
              <Progress value={((currentQuestion) / mod.quiz.length) * 100} className="w-24 h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">{mod.quiz[currentQuestion].question}</p>
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
            <div className="flex justify-end">
              <Button onClick={handleNext} disabled={selectedAnswer === null} className="gap-2">
                {currentQuestion < mod.quiz.length - 1 ? "Suivant" : "Terminer"}
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
                  Vous avez obtenu <span className="font-semibold text-foreground">{score}/{mod.quiz.length}</span>. Module validé !
                </p>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-red-400 mx-auto" />
                <h2 className="text-xl font-bold">Pas tout à fait...</h2>
                <p className="text-muted-foreground">
                  Score : {score}/{mod.quiz.length}. Relisez le contenu et réessayez.
                </p>
              </>
            )}
            <div className="flex justify-center gap-3 pt-4">
              <Button variant="outline" onClick={resetQuiz}>Recommencer le quiz</Button>
              {nextModule && (
                <Button onClick={() => router.push(`/education/${nextModule.id}`)} className="gap-2">
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
        ) : <div />}
        {nextModule && (
          <Link href={`/education/${nextModule.id}`}>
            <Button variant="outline" className="gap-2">
              Module {nextModule.id} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
