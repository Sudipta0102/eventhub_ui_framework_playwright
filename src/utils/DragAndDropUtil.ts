import { Locator } from "@playwright/test";

export class DragAndDropUtil{

    /**
     * Drags from source to target element. 
     * 
     * @param source 
     * @param target 
     */
    static async dragAndDrop(
        source: Locator,
        target: Locator
    ): Promise<void>{

        await source.dragTo(target);
    
    }

    /**
     * 
     * Drags from source to a coordinate within the page body.
     * 
     * @param source 
     * @param xOffset 
     * @param yOffset 
     */
    static async dragByOffset(
        source: Locator,
        xOffset: number,
        yOffset: number
    ): Promise<void>{

        await source.dragTo(source.page().locator('body'), { // locator('body') points to whole page
            targetPosition:{
                x: xOffset,
                y: yOffset
            }
        });

    }

    /**
     * Drags the source element to a specific coordinate within the target element.
     * 
     * 
     * @param source 
     * @param target - e.g: canvas, drag zone
     * @param targetX - X coordinate inside the target element.
     * @param targetY - Y coordinate inside the target element.
     */
    static async dragToPosition(
        source: Locator,
        target: Locator,
        targetX: number,
        targetY: number

    ): Promise<void>{

        await source.dragTo(target, {
            targetPosition:{
                x: targetX,
                y: targetY
            }
        });
    }
}