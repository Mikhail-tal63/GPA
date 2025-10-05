import React from "react";
import { useTranslation } from "react-i18next";
import {
  Calculator,
  Target,
  TrendingUp,
  BookOpen,
  Clock,
  Star,
  Lightbulb,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Tips: React.FC = () => {
  const { t } = useTranslation();
  const tipsList = t("tipsPage.tipsList", { returnObjects: true }) as any[];
  const gpaBenchmarks = t("tipsPage.gpaBenchmarks", {
    returnObjects: true,
  }) as any[];
  const academicSupport = t("tipsPage.academicSupportPoints", {
    returnObjects: true,
  }) as string[];
  const mentalHealth = t("tipsPage.mentalHealthPoints", {
    returnObjects: true,
  }) as string[];

  const icons = [Calculator, Target, TrendingUp, BookOpen, Clock, Star];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t("tipsPage.headerTitle")}</h1>
          <p className="text-muted-foreground">
            {t("tipsPage.headerSubtitle")}
          </p>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {tipsList.map((tip, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Card key={index} className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg">{tip.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {tip.category}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tip.points.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Resources */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {t("tipsPage.additionalResources")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                {t("tipsPage.academicSupport")}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {academicSupport.map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">{t("tipsPage.mentalHealth")}</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {mentalHealth.map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
