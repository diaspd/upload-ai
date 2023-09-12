import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { Label } from "./components/ui/label";

import { FileVideo, Lightbulb, Upload, Wand2 } from "lucide-react";


export function App() {
  return (
   <div className="min-h-screen flex flex-col">
    <header className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">upload.ai</h1>

      <div className="flex items-center gap-3">
        <Button variant="ghost" className="whitespace-nowrap">light theme</Button>

        <Separator orientation="vertical" className="h-8"/>

        <Button variant="outline">
          <GitHubLogoIcon className="h-4 w-4 mr-2"/>
          Github
        </Button>
      </div>
    </header>

    <main className="lg:flex-1 p-6 lg:flex grid gap-6">
      <div className="flex flex-col flex-1 gap-4">
        <div className="grid grid-rows-2 gap-4 flex-1">
          <Textarea 
            placeholder="Inclua o prompt para a IA..." 
            className="p-4 resize-none leading-relaxed"
          />
          <Textarea 
            placeholder="Resultado gerado pela IA..." 
            className="p-4 resize-none leading-relaxed"
            readOnly
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
        <form className="space-y-6">
          <label 
            htmlFor="video"
            className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
          >
            <FileVideo className="h-4 w-4"/>
            Selecione um vídeo
          </label>

          <input type="file" id="video" accept="video/mp4" className="sr-only"/>
        
          <Separator />

          <div className="space-y-2">
            <Label htmlFor="transcription_prompt">
              Prompt de transcrição
            </Label>
            <Textarea 
              id="transcription_prompt" 
              className="h-20 leading-relaxed resize-none" 
              placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
            />
          </div>

          <Button type="submit" className="w-full">
            Carregar vídeo
            <Upload className="w-4 h-4 ml-2"/>
          </Button>
        </form>

        <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Título do YouTube</SelectItem>
                  <SelectItem value="description">Descrição do YouTube</SelectItem>
                </SelectContent>
              </Select>
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
              />
              <span className="block text-sm text-muted-foreground italic leading-relaxed">
                Valores mais altor tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
      </aside>
    </main>
   </div>
  )
}
