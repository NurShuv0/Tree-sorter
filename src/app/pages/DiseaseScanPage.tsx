import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronRight,
  Droplets,
  FileImage,
  Leaf,
  Microscope,
  Scissors,
  ShieldCheck,
  Sparkles,
  Sun,
  UploadCloud,
  Wind,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';

export type DiseaseScanResult = {
  diagnosis: string;
  scientificCategory: string;
  confidence: number;
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  observations: string[];
  immediateSteps: string[];
  preventionTips: string[];
  alternateConditions: string[];
};

type ImagePreview = {
  name: string;
  size: number;
  url: string;
};

const symptomOptions = [
  'Yellow leaves',
  'Brown spots',
  'White powder',
  'Curling leaves',
  'Holes in leaves',
  'Wilting',
  'Bark damage',
  'Slow growth',
  'Fruit rot',
];

const defaultResult: DiseaseScanResult = {
  diagnosis: 'Likely Leaf Spot Disease',
  scientificCategory: 'Possible fungal leaf infection',
  confidence: 87,
  severity: 'Moderate',
  observations: [
    'Dark circular leaf spots',
    'Yellowing around affected areas',
    'Possible moisture-related fungal spread',
  ],
  immediateSteps: [
    'Remove heavily affected leaves',
    'Avoid watering leaves directly',
    'Improve airflow around the tree',
    'Keep fallen infected leaves away from the soil',
    'Monitor new growth for 7–10 days',
  ],
  preventionTips: [
    'Water near the root zone',
    'Prune dense branches for airflow',
    'Clean gardening tools before reuse',
    'Avoid excess nitrogen fertilizer during disease stress',
  ],
  alternateConditions: ['Nutrient deficiency', 'Sun scorch', 'Pest damage', 'Powdery mildew'],
};

const scanSteps = [
  'Checking visible leaf and bark patterns',
  'Comparing symptoms with common plant diseases',
  'Preparing care guidance',
];

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DiseaseScanPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const scanTimersRef = useRef<number[]>([]);
  const [image, setImage] = useState<ImagePreview | null>(null);
  const [treeName, setTreeName] = useState('');
  const [affectedArea, setAffectedArea] = useState('Not sure');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<DiseaseScanResult | null>(null);

  useEffect(() => () => {
    scanTimersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => () => {
    if (image?.url) URL.revokeObjectURL(image.url);
  }, [image?.url]);

  const selectFile = (file?: File) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Please choose a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Please choose an image smaller than 10 MB.');
      return;
    }

    setResult(null);
    setScanProgress(0);
    setImage({ name: file.name, size: file.size, url: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    setImage(null);
    setResult(null);
    setScanProgress(0);
    setIsScanning(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms((current) => current.includes(symptom)
      ? current.filter((item) => item !== symptom)
      : [...current, symptom]);
  };

  const startScan = () => {
    if (!image) return;
    setResult(null);
    setIsScanning(true);
    setScanProgress(12);
    scanTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    scanTimersRef.current = [
      window.setTimeout(() => setScanProgress(42), 550),
      window.setTimeout(() => setScanProgress(74), 1150),
      window.setTimeout(() => setScanProgress(100), 1650),
      window.setTimeout(() => {
        setResult(defaultResult);
        setIsScanning(false);
        toast.success('Mock screening result ready');
      }, 2100),
    ];
  };

  const resetForNewScan = () => {
    removeImage();
    setTreeName('');
    setAffectedArea('Not sure');
    setSymptoms([]);
  };

  const stepIndex = scanProgress < 42 ? 0 : scanProgress < 74 ? 1 : 2;

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-br from-primary/15 via-secondary/15 to-background">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl"
          >
            <Badge variant="secondary" className="mb-4 gap-1.5 border border-primary/15 bg-card/65 px-3 py-1 text-primary backdrop-blur">
              <Sparkles className="size-3.5" />
              AI Plant Health Screening
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">Check Your Tree&apos;s Health</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Upload a clear image of the affected area and get a visual disease screening with care recommendations.
            </p>
            <div className="mt-5 flex max-w-2xl gap-2 rounded-xl border border-primary/15 bg-card/65 px-4 py-3 text-sm leading-6 text-muted-foreground backdrop-blur">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
              Results are preliminary and should not replace advice from a certified agricultural specialist.
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(350px,0.8fr)]">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.04 }}
            className="space-y-6"
          >
            <Card className="overflow-hidden border-primary/15 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <UploadCloud className="size-5 text-primary" />
                  Upload a tree photo
                </CardTitle>
                <CardDescription>Use a close, well-lit photo showing the symptoms you want to screen.</CardDescription>
              </CardHeader>
              <CardContent>
                {!image ? (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Upload a photo of the affected tree area"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={(event) => { event.preventDefault(); setDragActive(true); }}
                    onDragOver={(event) => { event.preventDefault(); setDragActive(true); }}
                    onDragLeave={(event) => { event.preventDefault(); setDragActive(false); }}
                    onDrop={(event) => {
                      event.preventDefault();
                      setDragActive(false);
                      selectFile(event.dataTransfer.files?.[0]);
                    }}
                    className={`group flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${dragActive ? 'border-primary bg-primary/10' : 'border-primary/25 bg-primary/[0.035] hover:border-primary/55 hover:bg-primary/[0.07]'}`}
                  >
                    <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-transform group-hover:scale-105">
                      <UploadCloud className="size-8" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">Upload a photo of the affected tree area</h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                      For best results, photograph leaves, bark, branches, fruits, or visible symptoms in good natural light.
                    </p>
                    <p className="mt-3 text-xs font-medium text-muted-foreground">JPG, PNG, or WEBP • Maximum 10 MB</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Button type="button" onClick={(event) => { event.stopPropagation(); fileInputRef.current?.click(); }}>
                        <FileImage className="size-4" />
                        Choose Photo
                      </Button>
                      <Button type="button" variant="outline" onClick={(event) => { event.stopPropagation(); cameraInputRef.current?.click(); }}>
                        <Camera className="size-4" />
                        Use Camera
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-2xl border bg-muted/20">
                      <img src={image.url} alt="Selected tree area for disease screening" className="max-h-[460px] w-full object-contain" />
                      {isScanning && (
                        <div className="absolute inset-0 overflow-hidden bg-primary/5">
                          <motion.div
                            className="absolute inset-x-0 h-1.5 bg-primary shadow-[0_0_22px_rgba(46,125,50,0.85)]"
                            animate={{ top: ['3%', '94%', '3%'] }}
                            transition={{ duration: 1.55, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <div className="absolute inset-0 border-2 border-primary/35" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-primary/[0.045] px-4 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                          <CheckCircle2 className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">Image ready for screening</p>
                          <p className="truncate text-xs text-muted-foreground">{image.name} · {formatBytes(image.size)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isScanning}>
                          Replace photo
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={removeImage} disabled={isScanning} aria-label="Remove selected photo">
                          <X className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(event) => selectFile(event.target.files?.[0])}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  className="hidden"
                  onChange={(event) => selectFile(event.target.files?.[0])}
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="tree-name" className="text-sm font-medium text-foreground">Tree or plant name <span className="font-normal text-muted-foreground">— optional</span></label>
                    <Input
                      id="tree-name"
                      placeholder="e.g. Mango tree"
                      value={treeName}
                      onChange={(event) => setTreeName(event.target.value)}
                      disabled={isScanning}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Affected area</label>
                    <Select value={affectedArea} onValueChange={setAffectedArea} disabled={isScanning}>
                      <SelectTrigger aria-label="Affected tree area">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Leaf', 'Bark', 'Branch', 'Fruit', 'Root area', 'Whole tree', 'Not sure'].map((area) => <SelectItem key={area} value={area}>{area}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-foreground">Visible symptoms <span className="font-normal text-muted-foreground">— select any that apply</span></p>
                  <div className="flex flex-wrap gap-2">
                    {symptomOptions.map((symptom) => {
                      const selected = symptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => toggleSymptom(symptom)}
                          disabled={isScanning}
                          aria-pressed={selected}
                          className={`rounded-full border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-55 ${selected ? 'border-primary bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground'}`}
                        >
                          {symptom}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button type="button" size="lg" className="mt-6 w-full sm:w-auto" onClick={startScan} disabled={!image || isScanning}>
                  <Microscope className="size-4" />
                  {isScanning ? 'Analyzing tree health…' : 'Scan for Disease'}
                </Button>
              </CardContent>
            </Card>

            <AnimatePresence>
              {isScanning && image && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Card className="border-primary/20 bg-primary/[0.035] shadow-sm">
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">Analyzing tree health…</p>
                          <p className="mt-1 text-sm text-muted-foreground">This frontend preview simulates visual screening.</p>
                        </div>
                        <Badge variant="outline" className="border-primary/20 text-primary">{scanProgress}% complete</Badge>
                      </div>
                      <Progress value={scanProgress} className="mt-5" />
                      <div className="mt-5 grid gap-2 sm:grid-cols-3">
                        {scanSteps.map((step, index) => {
                          const complete = index < stepIndex;
                          const active = index === stepIndex;
                          return (
                            <div key={step} className={`flex items-start gap-2 rounded-xl border px-3 py-3 text-sm ${active ? 'border-primary/30 bg-card' : 'border-transparent bg-transparent'} ${complete ? 'text-primary' : 'text-muted-foreground'}`}>
                              {complete ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> : <span className={`mt-1.5 size-2 shrink-0 rounded-full ${active ? 'bg-primary animate-pulse' : 'bg-muted-foreground/40'}`} />}
                              <span>{step}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="space-y-6"
          >
            {!result ? (
              <Card className="border-primary/15 shadow-sm">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Leaf className="size-5" />
                  </div>
                  <CardTitle className="mt-3 text-xl">Best photo tips</CardTitle>
                  <CardDescription>Clear photos make a preliminary visual screening more useful.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    ['Use natural light', 'Avoid very dark, blurry, or heavily filtered photos.'],
                    ['Show the symptom closely', 'Include the affected leaf, bark, branch, or fruit in focus.'],
                    ['Add context when possible', 'A second photo showing the whole tree can help identify spread patterns.'],
                  ].map(([title, description], index) => (
                    <div key={title} className="flex gap-3 rounded-xl border bg-primary/[0.035] p-3">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary">{index + 1}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex gap-3 rounded-xl border border-primary/12 bg-primary/[0.045] px-3 py-3">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                    <p className="text-xs leading-5 text-muted-foreground">No photo is uploaded or sent anywhere in this frontend prototype.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="overflow-hidden border-primary/20 shadow-lg shadow-primary/5">
                <div className="border-b bg-primary/[0.06] px-6 py-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/12 text-primary"><Microscope className="size-4" /></div>
                        <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">
                          <AlertTriangle className="size-3" />
                          {result.severity}
                        </Badge>
                      </div>
                      <h2 className="mt-3 text-xl font-semibold text-foreground">{result.diagnosis}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{result.scientificCategory}</p>
                    </div>
                    <div className="rounded-xl border bg-card px-3 py-2 text-right">
                      <p className="text-lg font-semibold text-primary">{result.confidence}%</p>
                      <p className="text-[11px] text-muted-foreground">visual match</p>
                    </div>
                  </div>
                </div>

                <CardContent className="space-y-6 pt-6">
                  <ResultSection icon={<AlertTriangle className="size-4" />} title="What the scan noticed" items={result.observations} />
                  <ResultSection icon={<ShieldCheck className="size-4" />} title="Immediate care steps" items={result.immediateSteps} numbered />
                  <ResultSection icon={<Leaf className="size-4" />} title="Prevention tips" items={result.preventionTips} />

                  <Accordion type="single" collapsible className="rounded-xl border px-4">
                    <AccordionItem value="alternates" className="border-0">
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <span className="flex items-center gap-2"><Microscope className="size-4 text-primary" />Other possible conditions</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 pb-1">
                          {result.alternateConditions.map((condition) => <Badge key={condition} variant="outline" className="text-muted-foreground">{condition}</Badge>)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-4">
                    <div className="flex gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary"><Camera className="size-4" /></div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Recommended next action</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">Take a close-up photo of the affected leaf and compare new symptoms after one week.</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-muted/40 px-4 py-3 text-xs leading-5 text-muted-foreground">
                    <span className="font-semibold text-foreground">Safety disclaimer: </span>
                    This is an AI-assisted preliminary screening, not a laboratory diagnosis. Severe or fast-spreading symptoms should be inspected by a local agricultural officer, horticulturist, or certified plant specialist.
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button type="button" variant="outline" className="flex-1" onClick={resetForNewScan}>
                      <UploadCloud className="size-4" />
                      Scan Another Photo
                    </Button>
                    <Button
                      type="button"
                      className="flex-1"
                      onClick={() => navigate('/tree-assistant?question=My%20tree%20scan%20suggests%20possible%20Leaf%20Spot%20Disease%20with%2087%25%20confidence.%20What%20should%20I%20do%20next%3F')}
                    >
                      Ask AI About This Result
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-3 gap-3">
              {[
                [Droplets, 'Water at roots'],
                [Wind, 'Improve airflow'],
                [Sun, 'Use good light'],
                [Scissors, 'Clean pruning'],
              ].slice(0, 3).map(([Icon, label]) => {
                const FeatureIcon = Icon as typeof Droplets;
                return (
                  <div key={String(label)} className="rounded-xl border bg-card px-2 py-3 text-center">
                    <FeatureIcon className="mx-auto size-4 text-primary" />
                    <p className="mt-2 text-[11px] leading-4 text-muted-foreground">{String(label)}</p>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}

function ResultSection({
  icon,
  title,
  items,
  numbered = false,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <section>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="text-primary">{icon}</span>
        {title}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
            {numbered ? (
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[10px] font-semibold text-primary">{index + 1}</span>
            ) : (
              <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-primary" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
