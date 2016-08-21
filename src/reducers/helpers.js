
export function pointNearOrigin(point1, point2) {

    const d = Math.sqrt(
        (point1.x-point2.x)*(point1.x-point2.x) +
        (point1.y-point2.y)*(point1.y-point2.y)
    );

    return d < 10
}


/**
 * Given the last point and the current hover coords snap to nearest angle
 * of 90, 18
 */

export function snapToAngle(coords, path) {

    const angleSnap = 360/16;
    const lastPathPoint = path[path.length - 1];

    // Get angle between hover and last point
    const pointAngle = Math.atan2(
        lastPathPoint.y - coords.y,
        lastPathPoint.x - coords.x
    ) * 180 / Math.PI;

    // Snapp angle to nearest 'angleSnap'
    const snappedAngle = Math.round(pointAngle/angleSnap) * angleSnap;

    // Get distance of line
    const distance = Math.sqrt(
        (lastPathPoint.x-coords.x)*(lastPathPoint.x-coords.x) +
        (lastPathPoint.y-coords.y)*(lastPathPoint.y-coords.y)
    );

    // Find point from lastPathPoint at angle and distance

    return {
        x: -Math.cos(snappedAngle * Math.PI / 180) * distance + lastPathPoint.x,
        y: -Math.sin(snappedAngle * Math.PI / 180) * distance + lastPathPoint.y
    }
}

/**
 * In snap mode if the hover point is 'roughly' the same x or y as any point in
 * the path (apart from the previous), snap to it and flash that point.
 */

export function snapToPath(hoverOrigin, path) {

    const NEAR = 10;

    path = path.map((point, i) => {

        if (i === path.length - 1) return point;

        const xDiff = hoverOrigin.x - point.x;
        const yDiff = hoverOrigin.y - point.y;

        point.infinite = false;

        if (Math.abs(xDiff) <= NEAR) {
            point.infinite = true;
            hoverOrigin.x = point.x;
        }

        if (Math.abs(yDiff) <= NEAR) {
            point.infinite = true;
            hoverOrigin.y = point.y;
        }

        return point;
    });

    return { path, hoverOrigin };
}
