"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackAiPmCta } from "@/lib/analytics/ai-pm-client";
import type { AiPmCtaAction } from "@/lib/analytics/ai-pm-events";

type Props = ComponentProps<typeof Link> & { action: AiPmCtaAction };

export default function AiPmCtaLink({ action, onClick, ...props }: Props) {
  return <Link {...props} onClick={(event) => { trackAiPmCta(action); onClick?.(event); }} />;
}