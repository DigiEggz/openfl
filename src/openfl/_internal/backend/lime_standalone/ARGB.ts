namespace openfl._internal.backend.lime_standalone; #if openfl_html5

import openfl._internal.bindings.typedarray.UInt8Array;

abstract ARGB(UInt) from Int to Int from UInt to UInt
{
	private static a16: number;
	private static unmult: number;

	public a(get, set) : number;
	public b(get, set) : number;
	public g(get, set) : number;
	public r(get, set) : number;

	public inline new (argb : number = 0)
	{
		this = argb;
	}

	public static readonly create(a : number, r : number, g : number, b : number): ARGB
	{
		var argb = new ARGB();
		argb.set(a, r, g, b);
		return argb;
	}

	public inline multiplyAlpha(): void
		{
			if(a == 0)
	{
		this = 0;
	}
		else if (a != 0xFF)
	{
		a16 = RGBA.__alpha16[a];
		set(a, (r * a16) >> 16, (g * a16) >> 16, (b * a16) >> 16);
	}
}

	public inline readUInt8(data: number8Array, offset : number, format: PixelFormat = RGBA32, premultiplied : boolean = false): void
	{
		switch(format)
		{
			case BGRA32:
		set(data[offset + 1], data[offset], data[offset + 3], data[offset + 2]);

			case RGBA32:
set(data[offset + 1], data[offset + 2], data[offset + 3], data[offset]);

			case ARGB32:
set(data[offset + 2], data[offset + 3], data[offset], data[offset + 1]);
		}

if (premultiplied)
{
	unmultiplyAlpha();
}
	}

	public inline set(a : number, r : number, g : number, b : number): void
	{
		this = ((a & 0xFF) << 24) | ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
	}

	public inline unmultiplyAlpha()
{
	if (a != 0 && a != 0xFF)
	{
		unmult = 255.0 / a;
		set(a, RGBA.__clamp[Math.floor(r * unmult)], RGBA.__clamp[Math.floor(g * unmult)], RGBA.__clamp[Math.floor(b * unmult)]);
	}
}

	public inline writeUInt8(data: number8Array, offset : number, format: PixelFormat = RGBA32, premultiplied : boolean = false): void
	{
		if(premultiplied)
		{
			multiplyAlpha();
		}

		switch(format)
		{
			case BGRA32:
		data[offset] = b;
		data[offset + 1] = g;
		data[offset + 2] = r;
		data[offset + 3] = a;

		case RGBA32:
		data[offset] = r;
		data[offset + 1] = g;
		data[offset + 2] = b;
		data[offset + 3] = a;

		case ARGB32:
		data[offset] = a;
		data[offset + 1] = r;
		data[offset + 2] = g;
		data[offset + 3] = b;
	}
	}

@: from private static readonly __fromBGRA(bgra: BGRA): ARGB
{
	return ARGB.create(bgra.a, bgra.r, bgra.g, bgra.b);
}

@: from private static readonly __fromRGBA(rgba: RGBA): ARGB
{
	return ARGB.create(rgba.a, rgba.r, rgba.g, rgba.b);
}

	// Get & Set Methods
	protected inline get_a() : number
{
	return (this >> 24) & 0xFF;
}

	protected inline set_a(value : number) : number
{
	set(value, r, g, b);
	return value;
}

	protected inline get_b() : number
{
	return this & 0xFF;
}

	protected inline set_b(value : number) : number
{
	set(a, r, g, value);
	return value;
}

	protected inline get_g() : number
{
	return (this >> 8) & 0xFF;
}

	protected inline set_g(value : number) : number
{
	set(a, r, value, b);
	return value;
}

	protected inline get_r() : number
{
	return (this >> 16) & 0xFF;
}

	protected inline set_r(value : number) : number
{
	set(a, value, g, b);
	return value;
}
}
#end