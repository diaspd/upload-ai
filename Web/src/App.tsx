import { useState } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { Label } from "./components/ui/label";

import { Lightbulb, Wand2 } from "lucide-react";
import { VideoInputForm } from "./components/video-input-form";
import { useTheme } from "./components/theme-provider";
import { PromptSelect } from "./components/prompt-select";

import { useCompletion } from 'ai/react'


export function App() {
  const { theme, setTheme } = useTheme()
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const { 
    input, 
    setInput, 
    handleInputChange,
    handleSubmit, 
    completion,
    isLoading
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return (
   <div className="min-h-screen flex flex-col">
    <header className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">upload.ai</h1>

      <div className="flex items-center gap-3">
        { theme == "dark" ? 
          <Button variant="ghost" className="whitespace-nowrap" onClick={() => setTheme("light")}>light theme</Button> : 
          <Button variant="ghost" className="whitespace-nowrap" onClick={() => setTheme("dark")}>dark theme</Button> 
        }

        <Separator orientation="vertical" className="h-8"/>

        <Button variant="outline">
          <GitHubLogoIcon className="h-4 w-4 mr-2"/>
          <a href="https://github.com/diaspd" target="_blank">Github</a> 
        </Button>
      </div>
    </header>

    <main className="lg:flex-1 p-6 lg:flex grid gap-6">
      <div className="flex flex-col flex-1 gap-4">
        <div className="grid grid-rows-2 gap-4 flex-1">
          <Textarea 
            placeholder="Inclua o prompt para a IA..." 
            className="p-4 resize-none leading-relaxed"
            value={input}
            onChange={handleInputChange}
          />
          <Textarea 
            placeholder="Resultado gerado pela IA..." 
            className="p-4 resize-none leading-relaxed"
            readOnly
            value={completion}
          />
        </div>

        <span className="flex items-center gap-2">
          <label htmlFor="lightbulb" title="Lembre-se: você pode utilizar a variável transcription no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.">
            <Lightbulb className="h-5 w-5" />
          </label>
          
          <p className="hidden text-sm text-muted-foreground lg:flex whitespace-nowrap">
            Lembre-se: você pode utilizar a variável &nbsp; <code className="text-[#888fb8]">{'{transcription}'}</code> &nbsp; no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado. 
          </p>
        </span>  
      </div>
    
      <aside className="w-80 space-y-6 min-w-min">

        <VideoInputForm onVideoUploaded={setVideoId} />

        <Separator />

        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Prompt</Label>

              <PromptSelect onPromptSelected={setInput}/>
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-sm text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />
              <span className="block text-sm text-muted-foreground italic leading-relaxed">
                Valores mais altor tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full" disabled={isLoading}>
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
        </form>
      </aside>
    </main>
   </div>
  )
}
