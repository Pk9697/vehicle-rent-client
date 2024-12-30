import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

function WheelsStep({ selected, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">How many wheels?</h2>
      <RadioGroup value={selected} onValueChange={onChange}>
        <div className="grid grid-cols-2 gap-4">
          <Card className={selected === '2' ? 'border-primary' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="two" />
                <Label htmlFor="two">2 Wheels</Label>
              </div>
            </CardContent>
          </Card>
          <Card className={selected === '4' ? 'border-primary' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="four" />
                <Label htmlFor="four">4 Wheels</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </RadioGroup>
    </div>
  )
}

export default WheelsStep